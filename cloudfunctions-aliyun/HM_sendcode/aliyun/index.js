//发送验证码 阿里云短信
async function sendSms(PhoneNumber,type,code,config) {
	const Core = require('@alicloud/pop-core');
	var client = new Core({
		accessKeyId: config.aliyun.accessKeyId,
		accessKeySecret: config.aliyun.accessKeySecret,
		endpoint: 'https://dysmsapi.aliyuncs.com',
		apiVersion: '2017-05-25'
	});
	var params = {
		"RegionId": "cn-hangzhou",
		"PhoneNumbers": PhoneNumber + "",
		"SignName": config.aliyun.SignName,
		"TemplateCode": config.aliyun.TemplateID[type],
		"TemplateParam": "{\"" + config.aliyun.TemplateParamKey + "\":\"" + code + "\"}"
	}
	console.log("params: " + JSON.stringify(params));
	var requestOption = {
		method: 'POST'
	};
	let res = null;
	await client.request('SendSms', params, requestOption).then((result) => {
		res = {
			isSuccess: true,
			data: code
		};
	}, (e) => {
		console.log(e);
		res = {
			isSuccess: false,
			data: e
		};
	});
	return res;
}
module.exports = {
	send: async function(PhoneNumber,type,code,config) {
		if(!config.aliyun.TemplateID.hasOwnProperty(type)){
			return {
				stateCode: 1010,
				moremsg: "没找到config.aliyun.TemplateID."+type
			};
		}
		let sendState = await sendSms(PhoneNumber,type,code,config);
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