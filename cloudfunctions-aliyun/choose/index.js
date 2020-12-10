'use strict';
 const db=uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let collection=await db.collection('content').where({
		date: event.date
	}).get()
	// console.log(event);
	let a=collection.data
	//let b=a[0].mood
	// console.log(a);
	let c=[]
	if(JSON.stringify(a)==JSON.stringify(c)){
		return "dafault"
	}
	else{
		let b=a[0].mood
		return b
	}
	// //返回数据给客户端
	// return collection
};
