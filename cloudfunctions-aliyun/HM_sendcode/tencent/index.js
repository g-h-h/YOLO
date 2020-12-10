async function sendSms(PhoneNumber,type, code, config) {
	var QcloudSms = require('./qcloudsms_js');
	var res = null;
	var smsSign = config.tencent.Sign;
	// 实例化 QcloudSms
	var qcloudsms = await QcloudSms(config.tencent.appid, config.tencent.appkey);
	var ssender = await qcloudsms.SmsSingleSender();
	var params = [code];
	let sendCode = new Promise(function(resolve, reject) {
		ssender.sendWithParam("86", PhoneNumber, config.tencent.TemplateID[type],
			params, smsSign, "", "", (err, result, resData) => {
				if (err) {
					console.log("err: ", err);
					resolve({
						isSuccess: false,
						data: err
					});

				} else {
					//console.log("request data: ", result.req);//请求包
					//console.log("response data: ", resData);
					resolve({
						isSuccess: true,
						data: code
					})
				}
			});
	});
	await sendCode.then((e) => {
		res = e;
	});
	return res;
}
module.exports = {
	send: async function(PhoneNumber,type, code, config) {
		if(!config.tencent.TemplateID.hasOwnProperty(type)){
			return {
				stateCode: 1010,
				moremsg: "没找到config.tencent.TemplateID."+type
			};
		}
		let sendState = await sendSms(PhoneNumber,type, code, config);
		if (sendState.isSuccess) {
			return {
				stateCode: 0,
				code: sendState.data
			};
		} else {
			return {
				stateCode: 1009,
				moremsg: sendState.data
			};
		}
	}

}
