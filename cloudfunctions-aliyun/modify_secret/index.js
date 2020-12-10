'use strict';
const db=uniCloud.database();
const userDb=db.collection('HM_verificationCode')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let pnd = await userDb.where({"PhoneNumber":event.PhoneNumber}).get()
	let pnd2 = pnd.data
	let pnd3=[]
	
	if(JSON.stringify(pnd2)==JSON.stringify(pnd3)){
		console.log('账号不存在');
		return "bucunzai"
	}
	else{
		console.log('账号存在');
		if(pnd2[0].password==event.old_password){
			console.log('密码正确');
			let res = await userDb.where({PhoneNumber: event.PhoneNumber}).update({
			  password:event.new_password
			})
			return "chenggong"
		}
		else{
			console.log('密码错误');
		}
		}
	
	//返回数据给客户端
	return event
};
