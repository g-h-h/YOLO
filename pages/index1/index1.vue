<template>
	<view class="content">
		<button @tap="sendcode">发送</button>
		<input class="input" v-model="code" />
		<button @tap="checkcode">验证</button>
		<button type="primary">注册</button>
		<button type="primary">重置密码</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'YOLO',
				code:""
			}
		},
		onLoad() {

		},
		methods: {
			sendcode(){
				uniCloud.callFunction({
					name: 'HM_sendcode',
					data:{
						PhoneNumber:"15915018517"
					}
				}).then((res) => {
					uni.hideLoading();
					res = JSON.parse(res.result);
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			},
			checkcode(){
				uniCloud.callFunction({
					name: 'HM_checkCode',
					data:{
						PhoneNumber:"15915018517",
						code:this.code
					}
				}).then((res) => {
					uni.hideLoading();
					res = JSON.parse(res.result);
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					console.error(err)
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.input{
		border: #007AFF 1rpx solid;
		padding: 10rpx;
		height: 80rpx;
	}
</style>
