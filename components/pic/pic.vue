<template>
	<view v-if="moodback === 1">
		<uni-icons type="weather1" class="image" size="20" color="#616161" mode="aspectFit"></uni-icons>
		<!-- <image class="image" src="/static/天气1.png" mode="aspectFit"></image> -->
	</view>
	<view v-else-if="moodback === 2">
		<uni-icons type="weather2" class="image" size="20" color="#616161" mode="aspectFit"></uni-icons>
		<!-- <image class="image" src="/static/天气2.png" mode="aspectFit"></image> -->
	</view>
	<view v-else-if="moodback == 3">
		<uni-icons type="weather3" class="image" size="20" color="#616161" mode="aspectFit"></uni-icons>
		<!-- <image class="image" src="/static/天气3.png" mode="aspectFit"></image> -->
	</view>
	<view v-else>
		<image class="image" src="/static/qing.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moodback:'default'
			};
		},
		props:{
		date: {
		type:String
		}
		
		},
		created() {
			
			//this.moodback="happy"
		      uniCloud.callFunction({
						name:"choose",
						data:{
							date:this.date
						}
						
					}).then((res)=>{
						// console.log(res.result);
						this.moodback=res.result
						
						
					})   
		      }
			 
	}
</script>

<style>
.image{
	width: 20px;
	height: 20px;
	margin-top: 3px;
}
</style>
