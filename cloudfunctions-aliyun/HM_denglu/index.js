'use strict';
const db=uniCloud.database();
const userDb=db.collection('HM_verificationCode')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	 //成功比较两个数组相等
	 // let zh1 = await userDb.where({"PhoneNumber":"19862171098"}).get()
	 // let zh2=[]
	 // if(JSON.stringify(zh1.data)==JSON.stringify(zh2))
	 // console.log("相等");
	 // else console.log("不相等");
	//返回数据给客户端
	
	//密码想不想等
	// let pw = await userDb.where({"PhoneNumber":"19862171099"}).get()
	// let pw2=pw.data
	// let pw3=pw2[0].password
	// let pw4="123456qw"
	// if(JSON.stringify(pw3))==JSON.stringify(pw4))
	// console.log("相等");
	// else console.log("不相等");
	console.log(event,'event');
	// console.log(context,'context');
	//账号存不存在
	let pnd = await userDb.where({"PhoneNumber":event.phone}).get()
	let pnd2 = pnd.data
	let pnd3=[]
	
	if(JSON.stringify(pnd2)==JSON.stringify(pnd3)){
		console.log('账号不存在');
		return "bucunzai"
	}
	else{
		console.log('账号存在');
		if(pnd2[0].password==event.password){
			console.log('密码正确');
			return "zhengque"
		}
		else {
			console.log('密码错误');
			return "cuowu"
	}
	}
	// let insertData={
	// 	'PhoneNumber':event.phone
	// }
	// await userDb.add(insertData);
	
	
};
