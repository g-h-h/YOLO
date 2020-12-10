<template>
	<view>
		<!-- <view class="add-content-title" v-model="Date">{{Date}}</view> -->
		<view class="add-content">
			<textarea adjust-position="true" placeholder="记录一下你的小心情吧" class="add-textarea" v-model="content"></textarea>
		</view>
		<!-- <view class="add-image-title">添加图片：</view> -->
		<view class="add-image-box">
			<view class="add-image-item" v-for="(item,index) in imageList" :key="index">
				<view class="close-icon" @click="del(index)">
					<uni-icons type="closeempty" size="18" color="#fff"></uni-icons>
				</view>
				<view class="image-box">
					<image :src="item.url" mode="aspectFill"></image>
				</view>
			</view>
			<view class="add-image-item"  v-if="imageList.length<9 && imageList.length != 0">
				<view class="image-box">
					<uni-icons type="plusempty" size="50" color="#eee" @click="addImage"></uni-icons>
				</view>
			</view>
		</view>
		<view class="image-box">
			<uni-icons class="icons" type="images" size="25" color="#616161" @click="addImage" v-if="imageList.length == 0"></uni-icons>
			<!-- <uni-icons class="icons" type="location" size="25" color="#616161"></uni-icons> -->
			<uni-icons type="weather1" class="icons" size="25" color="#616161" @click="addMood(1)"></uni-icons>
			<uni-icons type="weather2" class="icons" size="25" color="#616161" @click="addMood(2)"></uni-icons>
			<uni-icons type="weather3" class="icons" size="25" color="#616161" @click="addMood(3)"></uni-icons>
			<!-- <uni-icons type="weather3" class="icons" size="25" color="#616161" @click="addMood(4)"></uni-icons> -->
			
		</view>
		<view class="edit-button">
			<button class="button" form-type="submit" @click="submit" >保存</button>
			<!-- <button class="button" @click="update">更新</button> -->
		</view>
		
	</view>
</template>

<script>
	var Date, mood;
	export default {
		
		data() {
			return {
				content:'',//内容
				imageList: [],//图片
				Date:'',//日期
				mood:''//心情
			};
			
		},//data
		methods: {
			del(index) {
				this.imageList.splice(index, 1)
			},//del images
			addImage() {
				const count = 9 - this.imageList.length
				uni.chooseImage({
					count: 9, //最多选择9张
					success: (res) => {
						const tempfilepaths = res.tempFilePaths
						tempfilepaths.forEach((item, index) => {
							if (index < count) {
								this.imageList.push({
									url: item
								})
							}

						})
						console.log(res);
					}
				})
			}, //addImage
			async submit() {
				
				let imagesPath = []
				
				for (let i = 0; i < this.imageList.length; i++) {
					const filePath = this.imageList[i].url
					await this.uploadFiles(filePath)
					imagesPath.push(filePath)
				}//for
				
				uniCloud.callFunction({
					name:'add',
					data:{
						content:this.content,
						images:imagesPath,
						date:this.Date,
						mood:this.mood,
					},					
				})
					uni.showToast({
						title:"保存成功"
					})
					uni.navigateTo({
						url: '/pages/calendar/calendar',
						success: res => {},						
					});									
			},//submit
			async uploadFiles(filePath){
				const result = await uniCloud.uploadFile({
					filePath:filePath,
					cloudPath:filePath
				})
				console.log(result)
				return result.fileID
			},//upLoadfiles
			
			addMood(a){
				this.mood = a;
				uni.showToast({
					title:"已选择"
				})
			},
			async update() {
				
				let imagesPath = []
				
				for (let i = 0; i < this.imageList.length; i++) {
					const filePath = this.imageList[i].url
					await this.uploadFiles(filePath)
					imagesPath.push(filePath)
				}//for
				
				uniCloud.callFunction({
					name:'update',
					data:{
						content:this.content,
						images:imagesPath,
						date:this.Date,
						mood:this.mood,
					},					
				})
					uni.showToast({
						title:"更新成功"
					})
					uni.navigateTo({
						url: '/pages/calendar/calendar',
						success: res => {},
						
					});
			},//update	
			
		} ,//methods
		
		onLoad(date) {
			console.log(date)
			this.Date = date.date
		}
		
	} //export
</script>

<style lang="scss">
	.add-content-title ,.add-image-title {
		font-size: 14px;
		margin: 15px;
		margin-bottom: 0;
		font-size: 14px;
		color: #666;
	}

	.add-content {
		margin: 15px;
		padding: 10px;
		box-sizing: border-box;
		border: 1px #eee solid;
	}

	.add-textarea {
		font-size: 12px;
		width: 100%;
		height: 100px;
	}

	.add-image-box {
		flex-wrap: wrap;
		display: flex;
		padding: 10px;

		.add-image-item {
			width: 33.33%;
			position: relative;
			height: 0;
			padding-top: 33.33%;
			box-sizing: border-box;

			.close-icon {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				right: 0;
				top: 0;
				width: 22px;
				height: 22px;
				border-radius: 50%;
				background-color: #ff5a5f;
				z-index: 2;
			}

			.image-box {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 5px;
				right: 5px;
				bottom: 5px;
				left: 5px;
				border: 1px #eee solid;
				border-radius: 5px;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}
	.button{
		border-radius: 10%;
		
	}
.icons{
	margin-left: 5px;
	
}
uni-image {
		    width: 100%;
		    height: 100%;
		    display: inline-block;
		    overflow: hidden;
		    position: relative;
		}
			uni-image>div, uni-image>img {
			    width: 60rpx;
			    height: 60rpx;
			} 
</style>
