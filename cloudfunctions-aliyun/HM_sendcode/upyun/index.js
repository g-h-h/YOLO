async function sendSms(PhoneNumber,type, code, config) {
	const smsApi = 'https://sms-api.upyun.com/api/messages';
	const res = await uniCloud.httpclient.request(smsApi, {
		method: 'POST',
		headers: {
			"Content-type": "application/x-www-form-urlencode",
			"Authorization":  config.upyun.token
		},
		data: {
			mobile: PhoneNumber,
			template_id: config.upyun.TemplateID[type],
			vars: code
		},
		dataType: 'json'
	})
	let data = res.data;
	if(data.hasOwnProperty("error_code")){
		return {
			isSuccess: false,
			data: data
		}
	}else{
		return {
			isSuccess: true,
			data: code
		}
	}
	//{"message_ids":[{"message_id":22534649,"mobile":"15915018517"}]}
	//{"error_code":"TEMPLATE_NOT_FOUND","message":"Template not found"}

}
module.exports = {
	send: async function(PhoneNumber,type, code, config) {
		if(!config.upyun.TemplateID.hasOwnProperty(type)){
			return {
				stateCode: 1010,
				moremsg: "没找到config.upyun.TemplateID."+type
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
