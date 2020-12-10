<template>
	<view>
		<view class="bg"></view>
		<view class="form">
			<view class="logo">
				<image src="/static/logo_1.jpg"></image>
			</view>
			<view class="email">
				<input placeholder="请输入注册手机号" placeholder-style="color:#2f2f2f;" v-model="PhoneNumber" />
			</view>
			
			<view class="secret">
				<view class="get_secret"></view>
				<input placeholder="请输入密码" placeholder-style="color:#2f2f2f;"  password="true" v-model="dl_mima" @confirm="mima"/>
			</view>
			<view class="secret">
				<view class="get_secret" > </view>
				<input placeholder="请再次输入密码" placeholder-style="color:#2f2f2f;"  password="true" @confirm="q_mima"/>
			</view>
			<view class="code">
				<view class="get-code" :style="{'color':getCodeBtnColor}" @tap.stop="getCode()">{{getCodeText}}</view>
				<input placeholder="验证码" placeholder-style="color:#2f2f2f;" v-model="code" />
			</view>
			<view class="btn" @tap="register">
				注册
			</view>
			<view class="tis">
				点击注册，即代表您同意<view class="terms">《用户协议》</view>
			</view>
			<view class="mode">
				<view @tap="toRePwd" hover-class="dl1">忘记密码</view>
				<view class="dl" @click="tzdl" hover-class="dl1">登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	var yi_mima,er_mima
	export default {
		data() {
			return {
				getCodeText:'获取验证码',
				getCodeBtnColor:"#62b5fe",
				getCodeisWaiting:false,
				PhoneNumber:'',
				password:'',
				code:''
			};
		},
		methods:{
			register(){
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.PhoneNumber))){
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				}
				uni.showLoading();
				uniCloud.callFunction({
					name: 'HM_checkcode',
					data:{
						type:"register",
						PhoneNumber:this.PhoneNumber,
						code:this.code
					}
				}).then((res) => {
					uni.hideLoading()
					res = JSON.parse(res.result);
					if(res.ret==0){
						uni.showModal({
							title: '注册提示',
							content: '注册成功，马上跳转到登录',
							showCancel:false,
							success: (res)=>{
							}
						});
						setTimeout(()=>{
						  uni.navigateTo({
						  	url:'../login/login'
						  })
						},2000)
					}else{
						uni.showToast({title: res.msg,icon:"none"});
					}
				}).catch((err) => {
					uni.hideLoading()
					console.error(err);
				})
			},
			getCode(){
				uni.hideKeyboard()
				if(this.getCodeisWaiting){
					return ;
				}
				if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.PhoneNumber))){ 
					uni.showToast({title: '请填写正确手机号码',icon:"none"});
					return false; 
				} 
				
				this.getCodeText = "发送中..."
				this.getCodeisWaiting = true;
				this.getCodeBtnColor = "#999"
				// #ifdef APP-PLUS
				plus.device.getInfo({
					complete:(e)=>{
						this.sendSMS(e.uuid);
					}
				})
				// #endif
				// #ifndef APP-PLUS
				this.sendSMS(null);
				// #endif
				
			},
			sendSMS(uuid){
				uniCloud.callFunction({
					name: 'HM_sendcode',
					data:{
						type:"register",
						uuid:uuid,
						PhoneNumber:this.PhoneNumber,
						password:this.dl_mima
					}
				}).then((res) => {
					res = JSON.parse(res.result);
					console.log(res);
					if(res.ret==0){
						uni.showToast({title: '验证码已发送',icon:"none"});
						this.setTimer();
					}
					else if(res==4){
						uni.showToast({
							title:"账号已存在",
							icon:"none"
						})
						this.getCodeText=""
					}
					else{
						uni.showToast({title: res.msg,icon:"none"});
						this.restart()
					}
				}).catch((err) => {
					uni.showToast({title: '请求获取验证码失败',icon:"none"});
					console.log(err);
					console.error(err)
					this.restart()
				})
			},
			restart(){
				this.getCodeisWaiting = false;
				this.getCodeBtnColor = "#62b5fe";
				this.getCodeText = "获取验证码"
			},
			setTimer(){
				let holdTime = 60;
				this.getCodeText = "重新获取(60)"
				this.Timer = setInterval(()=>{
					if(holdTime<=0){
						this.restart();
						clearInterval(this.Timer);
						return ;
					}
					this.getCodeText = "重新获取("+holdTime+")"
					holdTime--;
					
				},1000)
			},
			toRePwd(){
				uni.navigateTo({
					url:"../resetpassword/resetpassword",
					animationType:"fade-in"
				})
			},
			mima(event){
				yi_mima=event.detail;
				console.log(yi_mima);
			},
			q_mima(event){
				er_mima=event.detail;
				console.log(er_mima);
				if(yi_mima.value!=er_mima.value){
					uni.showModal({
						title:"两次密码不一致",
						showCancel:false
					})
				}
			},
			tzdl(){
				setTimeout(()=>{
				  uni.navigateTo({
				  	url:'../login/login'
				  })
				},500)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f0f1f2;
	}
view{
	display: flex;
	flex-wrap: wrap;
}

.bg{
	width: 100%;
	height: 550upx;
	padding-top: var(--status-bar-height);
	background:linear-gradient(to bottom,#62b5fe,#3d86e4);
	
}
.form{
	display: block;
	width: 80%;
	margin: -200upx auto 0 auto;
	height: 900upx;
	background-color: #fff;
	box-shadow: rgba(63,139,229,0.26) 0 0 20upx;
	justify-content: center;
	align-items: flex-start;
	position: relative;
	>view{
		width: 86%;
		margin: 0 7%;
	}
	.logo{
		height: 200upx;
		align-items: center;
		image{
			width: 60%;
			height: 60%;
		}
	}
	.username,.password,.email,.code{
		height: 90upx;
		margin-bottom: 20upx;
		border-bottom: #ececec 2upx solid;
		align-items: center;
		justify-content: center;
		opacity: 0;
		input{
			width: 96%;
			font-size: 34upx;
		}
	}
	.secret{
		height: 90upx;
		margin-bottom: 20upx;
		border-bottom: #ececec 2upx solid;
		align-items: center;
		justify-content: center;
		opacity: 0;
		input{
			width: 96%;
			font-size: 34upx;
		}
	}
	.code{
		position: relative;
		.get-code{
			height: 50upx;
			align-items: center;
			position: absolute;
			right: 0;
			padding: 0 20upx;
			// border-left: solid 1upx #fff;
			z-index: 10;
			font-size: 32upx;
			// &:after {
			// 	content: " ";
			// 	width: 1upx;
			// 	height: 50upx;
			// 	background-color: #ececec;
			// 	position: absolute;
			// 	z-index: 10;
			// 	margin-right: 100%;
			// 	left: 0;
			// 	
			// }
		}
	}
	.btn{
		margin-top: 40upx;
		height: 80upx;
		// background-color: #62b5fe;
		background:linear-gradient(to left,#62b5fe,#3d86e4);
		font-size: 34upx;
		align-items: center;
		justify-content: center;
		color: #fff;
		opacity: 0;
		// border-radius: 80upx;
	}
	.tis{
		margin-top: 20upx;

		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: baseline;
		color: #999;
		.terms{
			color: #5a9ef7;
		}
	}
	@keyframes showform {
		0% {
			opacity: 0;
			transform: translateY(40upx);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.username,.password,.email,.btn,.code,.tis,.secret{
		animation: showform 0.5s linear both;
	}
	.username{
		animation-delay: 0s;
	}
	.password{
		animation-delay: 20ms;
	}
	.email{
		animation-delay: 40ms;
	}
	.code{
		animation-delay: 60ms;
	}
	.btn,.tis{
		animation-delay: 80ms;
	}
	.mode{
		position: absolute;
		bottom: 20upx;
		justify-content: center;
		font-size: 28upx;
		color: #555;
		view{
			padding: 10upx 0;
		}
		.center{
			justify-content: center;
			width: 60upx;
		}
		.dl{
			margin-left: 20px;
		}
	}
	.dl1{
		color: #4CD964;
	}
}
</style>
