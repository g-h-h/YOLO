<template>
	<view class="contact">
		<image class="img" src="../../static/contact.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：200-916-3874 ( 点击拨打 )</view>
			<view>全球总部地址：山东师范大学长清湖校区1号楼</view>
		</view>
		<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude: 116.833763,
				latitude: 36.548101,
				scale: 16,
				markers:[
					{
						longitude: 116.833763,
						latitude: 36.548101,
						iconPath: '../../static/shilu-login/logo1.png',
						width: 30,
						height: 30
					}
				]
			}
		},
		methods: {
			phone() {
				uni.makePhoneCall({
					phoneNumber: '200-916-3874'
				})
			}
		}
	}
</script>

<style lang="scss">
.contact{
	.img{
		width: 750rpx;
		height: 320rpx;
	}
	.info{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view{
			line-height: 80rpx;
			border-bottom: 1px solid #eee;
		}
	}
	
	.map{
		width: 100%;
		height: 730rpx;
		border: 1px #eee solid;
		}
}
</style>
