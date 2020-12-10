<template>
	<view class="drawer" :class="{ 'drawer-active' : drawerStatus }">
		<view class="drawer-nav">
			<image src="../../static/QQ图片20201208191551.jpg" class="avatar" mode="widthFix"></image>
			<uni-icons class="drawer-hide-icon" type="arrowright" size="30" color="#6a508a" @click="toggleDrawer"></uni-icons>
		</view>
		<view class="drawerList">
			<view class="vbox">
				<!-- 下半部分 -->
				<view class="index">
					<view class="cell" @click="">
						<view class="cell-left">
							<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
							<text class="cell-text">当前用户：</text>
							<text class="zhanghao" selectable>{{yonghu2}}</text>
						</view>
					</view>
					
					<view class="cell" @click="xiugai">
						<view class="cell-left">
							<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
							<text class="cell-text">修改密码</text>
						</view>
					</view>
					<view class="cell" @click="">
						<view class="cell-left">
							<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
							<text class="cell-text">当前版本:</text>
							<text class="banben">1.0.0</text>
						</view>
					</view>
			
					<view class="cell" @click="gengxin">
						<view class="cell-left">
							<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
							<text class="cell-text">检查更新</text>
						</view>
					</view>
			
					<!-- <view class="cell" @click="">
						<view class="cell-left">
							<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
							<text class="cell-text">清除缓存</text>
						</view>
					</view> -->
			
			
					<view class="cell" @click="">
						<view class="cell-left">
							<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
							<text class="cell-text">联系我们</text>
						</view>
					</view>
			
				</view>
			
				<!-- 退出登录 -->
				<view class="logout" style="width:80%;margin-top: 50upx;">
					<button type="warn" @click="logout">退出登录</button>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import helper from '../../common/helper.js'
	export default {
		components: {}, 
		data() {
			return {	
				'drawerStatus' : false,
				 yonghu2:''
			};
		},
		methods: {
			toggleDrawer () {
				console.log(123213)
				this.drawerStatus = ! this.drawerStatus
			},
			logout() {
			
				uni.showModal({
					title: '提示',
					content: '确认退出登陆？',
					success: function(res) {
						if (res.confirm) {
							uni.removeStorage({
								key: 'token',
								success(res) {
									uni.redirectTo({
										url: '/pages/login/login'
									})
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			
			
			},
			xiugai(){
				setTimeout(()=>{
				  uni.navigateTo({
					url:'../../pages/modify/modify'
				  })
				},1000)
			},
			gengxin(){
				console.log('已调用');
				uni.showToast({
					title:'已是最新版本',
					icon:'none'
				})
			}
		},
		created() {
			this.yonghu2=helper.yonghu1
		}
	}
</script>

<style>
	.drawer {
		position: fixed;
		width: 80%;
		height: 100%;
		background-color: #dfe0f7;
		z-index: 10;
		padding: 10px;
		left: -100%;
		transition: all .25s ease;
		box-shadow: 0 0 20px 4px #a7a7a7;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.drawer-active {
		left: 0;
	}

	.drawer-nav {
		 text-align: center;
		 position: relative;
		 margin: 15px 0px;
		 display: flex;
		 justify-content: space-evenly;
		 /* background/-color: #004444; */
	}
	
	.drawer-nav .avatar {
/* 		height: 125px;
		width: 120px;
		border-radius: 20px;
		background-image: linear-gradient(to bottom, #007aff, #0dddff);
		color: white;
		line-height: 125px;
		font-size: 23px; */
		width: 120px;
		border-radius: 50%;
		background-color: #007AFF;
		height: 220px;
	}
	
	.drawerList {
		flex: 1;
		/* border: #000000 2px solid; */
	}
	
	.drawer-hide-icon {
		top: 50%;
		position: absolute;
		right: 0px;
		transform: translateY(-50%);
	}

.drawerList_foot{
	margin-bottom: 2px;
	}
	
	
	.index {
		display: flex;
		flex-direction: column;
		width: 100%;
		/* background-color: white; */
		/* border-top: 1px solid #cccccc; */
	}
	
	.vbox {
		display: flex;
		flex-direction: column;
		align-items: center;
		/* background-color: #2C405A; */
	}
	
	.cell {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		height: 90upx;
		align-items: center;
		justify-content: space-between;
		margin-top: 2px;
		border-radius: 10px;
		background-color: white;
	}
	
	.cell:active {
		background-color: #333;
		color: white;
		box-shadow: 1upx 1upx 35upx #ccc;
	}
	
	.cell-left {
		display: flex;
		align-items: center;
		margin-left: 65upx;
	}
	
	.cell-text {
		margin-left: 25upx;
	}
	
	.cell_icon {
		width: 40upx;
		height: 40upx;
		height: 40upx;
	}
	
	.right-arrow {
		color: #aaa;
		width: 15upx;
		height: 28upx;
	}
	.zhanghao{
		font-size: 15px;
	}
	.banben{
		font-size: 15px;
		margin-left: 25px;
	}
</style>
