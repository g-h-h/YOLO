'use strict';
const CodeTable = uniCloud.database().collection("HM_verificationCode");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let insertData = {
		"PhoneNumber": '19862171099',
		"type":'register',
		"password":'123456'
	}
	await CodeTable.add(insertData);
	
	//返回数据给客户端
	return event
};
