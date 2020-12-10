'use strict';
const HMconfig = require('hm-config');//获取配置
const HMprint = require('hm-print');//打印消息
const HMflowcontrol = require('./flow_control');
const CodeTable = uniCloud.database().collection("HM_verificationCode");
const dbCmd = uniCloud.database().command // 取指令

Date.prototype.Format = function(fmt) { //author: meizz 
	let o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[
			k]).substr(("" + o[k]).length)));
	return fmt;
}

exports.main = async (event, context) => {
	let phonenum = await CodeTable.where({"PhoneNumber":event.PhoneNumber}).get()
	let phonenum2=phonenum.data
	let phonenum3=[]
	if(!event.type){
		return HMprint.error(1010);//传入type有误
	}
	if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(event.PhoneNumber))){
		return HMprint.error(1011);//传入手机号有误
	} 
	if(JSON.stringify(phonenum2)!=JSON.stringify(phonenum3)){
		console.log('账号已存在');
		return 4
	}
	// 检查流控
	let stateCode = await HMflowcontrol.checkLimit(event, context, HMconfig);
	console.log("stateCode: " + stateCode);
	if (stateCode != 0) {
		return HMprint.error(stateCode);
	}
	//生成验证码
	const code = (Array(HMconfig.Code_Length).join('0') + Math.floor(Math.random() * Math.pow(10, HMconfig.Code_Length)))
		.slice(-HMconfig.Code_Length);
	// 引入对应模块
	var SMS = require('./' + HMconfig.SMS_Provider);
	//调用发送验证码方法
	let sendState = await SMS.send(event.PhoneNumber,event.type, code, HMconfig);
	// sendState 方法返回数据
	if (sendState.stateCode != 0) {
		return HMprint.error(sendState.stateCode, sendState.moremsg);
	}
	//入库
	let nowTime = parseInt(new Date() / 1000);
	let todayDate = new Date().Format("yyyy-MM-dd");
	let insertData = {
		"Code": sendState.code,
		"ExpireTime": nowTime + parseInt(HMconfig.Valid_Time),
		"IP": context.CLIENTIP,
		"PhoneNumber": event.PhoneNumber,
		"SendDate": todayDate,
		"SendTime": nowTime,
		"type":event.type,
		"UUID": event.uuid,
		"password":event.password
	}
	await CodeTable.add(insertData);
	//await CodeTable.remove('');
	//自动清除记录 HMconfig.Retention_Time设置
	if(HMconfig.Retention_Time){
		var RetentionTime = parseInt(new Date(new Date().setHours(0, 0, 0, 0)) / 1000);
		var RetentionTime = RetentionTime - 86400 * HMconfig.Retention_Time;
		await CodeTable.where({
			SendDate:dbCmd.lt(RetentionTime),
			ExpireTime:dbCmd.lt(nowTime)
		}).remove();
	}
	return HMprint.success();
};
