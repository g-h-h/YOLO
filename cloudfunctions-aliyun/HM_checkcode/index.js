'use strict';
const HMprint = require('hm-print');
const CodeTable = uniCloud.database().collection("HM_verificationCode");
const dbCmd = uniCloud.database().command // 取指令

async function getValidNumber(PhoneNumber,type,SMScode) {
	let nowTime = parseInt(new Date()/1000);
	let res = await CodeTable.where({
		PhoneNumber: PhoneNumber,
		type:type,
		Code:SMScode,
		SendTime:dbCmd.lte(nowTime),
		ExpireTime:dbCmd.gte(nowTime)
	}).count();
	return res.total;
}
async function ExpireAllCode(PhoneNumber,type) {
	let nowTime = parseInt(new Date()/1000);
	let res = await CodeTable.where({
			PhoneNumber: PhoneNumber,
			type:type,
			ExpireTime: dbCmd.gte(nowTime)
		}).update({
			ExpireTime: nowTime-1,
	});
	return res;
}

exports.main = async (event, context) => {
	if(!event.type){
		return HMprint.error(1010);
	}
	let stateCode = 0;
	let ValidNumber = await getValidNumber(event.PhoneNumber,event.type,event.code);
	if(ValidNumber>0){
		await ExpireAllCode(event.PhoneNumber,event.type);
		return HMprint.success();
	}
	else
	{
		return HMprint.error(1007);
	}
};