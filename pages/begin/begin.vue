<template>
	<view class="content">
		<view style="background-image: url(../../static/fengmian1.gif);">
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: ''
			}
		},
		onLoad() {
			this.screenHeight = uni.getSystemInfoSync().windowHeight;
			setTimeout(()=>{
				uni.redirectTo({
					url:'../login/login'
				})
			},4000)
		},
		methods: {
			// touch(){
			// 	uni.navigateTo({
			// 		url:'2'
			// 	})
			// }
		}
	}
</script>

<style>
	page{
	        width: 100%;
	        height: 100%;
	 }
	.isOver{
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 28rpx;
	},
	view{
		width: 100%; 
		height: 100%;
	},
	.df{
		position: relative;
		height: 100%;
		text-align: center;
		/* line-height: 2320rpx; */
	    line-height: 1160rpx;
	}
</style>
