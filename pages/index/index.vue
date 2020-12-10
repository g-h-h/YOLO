<template>
	<view class="container">
		<drawer-menu ref='drawerMenu' ></drawer-menu>
		<view class="nav">	
			<!-- <uni-icons type="arrowthinleft" size="22" color="#83ff31" @click="$refs.drawerMenu.toggleDrawer()"></uni-icons> -->
			<view>	
				<uni-icons type="more-filled" @click="$refs.drawerMenu.toggleDrawer()" size="24" color="#906bff" style="position: right;"></uni-icons>
			</view>
		</view>
		<view class="body">
			<view id="addBtn1" @click="addItem1">
				<icon type="clear" size="70" color="#ffaaff"/>
			</view>
		</view>
		<view class="foot">
			<!-- <view id="addBtn" @click="addItem">
				<icon type="clear" size="60" color="#00ffff"/>
			</view> -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			addItem () {
				uni.navigateTo({
					url: '../edit/edit',
					
				});
				// this.$refs.popup.open()
			},			
			addItem1 () {
				uni.navigateTo({
					url: '../edit/edit',
				});
				// this.$refs.popup.open()
			},			
		},
		
	}
</script>

<style scoped>
	.container {
		padding: 0px;
		font-size: 14px;
		line-height: 24px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		/* background-color: #006600; */
	}
	.nav {
		padding: 30rpx 30rpx 10rpx 30rpx;
		display: flex;
		justify-content: flex-end;
		/* background-color: #aaaaff; */
		/* border: #718C00 5px solid; */
		/* border-top: 3px #000066 solid; */
	}
	.nav > view {
		display:flex; 
		width: 30px;
		justify-content: flex-end;
		/* background-color: #aaaaff; */
		
	}

	.body{
		position: relative;
		height: 70vh;
		/* background-color: #007AFF; */
		/* border: 2px #C82829 solid; */
	}
	#addBtn1{
		margin-left: 25vh;
		margin-top: 25vh;
	}
	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 160rpx;
		/* background-color: #007AFF; */
	}
		
	#addBtn {
		position: absolute;
		right: 46rpx;
		bottom: 40rpx;
		transform: rotate(45deg);
	}
	
</style>
