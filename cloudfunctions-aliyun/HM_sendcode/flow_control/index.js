"use strict";
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
var todayDate = new Date().Format("yyyy-MM-dd");

async function getTodaySendNumber() {
	let res = await CodeTable.where({
		SendDate: todayDate
	}).count()
	return res.total;
}

async function getSendNumberByPhoneNumber(PhoneNumber) {
	let res = await CodeTable.where({
		SendDate: todayDate,
		PhoneNumber: PhoneNumber
	}).count()
	return res.total;
}
async function getSendNumberByIP(IP) {
	let res = await CodeTable.where({
		SendDate: todayDate,
		IP: IP
	}).count()
	return res.total;
}
async function getSendNumberByUUID(uuid){
	let res = await CodeTable.where({
		SendDate: todayDate,
		UUID: uuid
	}).count();
	return res.total;
}
async function getLastSendRow(PhoneNumber){
	let res = await CodeTable.where({
		PhoneNumber: PhoneNumber
	}).orderBy("SendTime", "desc").limit(1).get();
	return res.data;
}

module.exports = {
	checkLimit: async function(event, context,config) {
		console.log("config.Switch: " + config.Switch);
		if(!config.Switch){
			return 1001;
		}
		if(config.Limit_Today){
			console.log("config.Limit_Today: " + config.Limit_Today);
			let SendNumber = await getTodaySendNumber();
			console.log("SendNumber: " + SendNumber);
			if(SendNumber>=config.Limit_Today){
				return 1002;
			}
		}
		if(config.Limit_PhoneNumber){
			let SendNumber = await getSendNumberByPhoneNumber(event.PhoneNumber);
			if(SendNumber>=config.Limit_PhoneNumber){
				return 1003;
			}
		}
		if(config.Limit_IP){
			let IP = context.CLIENTIP;
			let SendNumber = await getSendNumberByIP(IP);
			if(SendNumber>=config.Limit_IP){
				return 1004;
			}
		}
		if(config.Limit_UUID && event.hasOwnProperty('uuid')){
			let uuid = event.uuid;
			let SendNumber = await getSendNumberByUUID(uuid);
			if(SendNumber>=config.Limit_UUID){
				return 1005;
			}
		}
		if(config.Send_Interval){
			let LastSendRow = await getLastSendRow(event.PhoneNumber);
			console.log("LastSendRow: " + JSON.stringify(LastSendRow));
			if(LastSendRow.length>0){
				let nowTime = parseInt(new Date()/1000);
				let LastSendTime = LastSendRow[0].SendTime;console.log("nowTime - LastSendTime: " + (nowTime - LastSendTime));
				if(nowTime - LastSendTime<config.Send_Interval){
					return 1006;
				}
			}
		}
		return 0;
	}
}
