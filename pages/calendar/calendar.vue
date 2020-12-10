<template>
	<view class="content">
		<view class="container">
			<drawer-menu ref='drawerMenu' ></drawer-menu>
			<view class="nav">	
				<view>	
					<uni-icons type="more-filled" @click="$refs.drawerMenu.toggleDrawer()" size="24" color="#906bff" style="position: right;"></uni-icons>
				</view>
			</view>			
		</view>
		<ren-calendar ref='ren' :markDays='markDays' :open="true" :disabledAfter='true' v-if="hackReset2" @onDayClick='onDayClick'></ren-calendar>
        <view class="change">选中日期：{{curDate}}</view>
		<view class="example-body">
			<!-- <uni-card @click="clickCard"><text class="content-box-text">这是一个基础卡片示例，内容较少，此示例不带边框阴影。</text></uni-card> -->
			<!-- <uni-card title="标题文字" isShadow @click="clickCard"><text class="content-box-text">这是一个基础卡片示例，内容比较多，内容样式可自定义，卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、时间等，此示例带边框阴影。</text></uni-card> -->
			<uni-card :title="curDate" v-if="hackReset" extra="" isShadow note="Tips" @click1="clickCard" @Toupdate="update">
				<view class="content-box-text" >
					<text>{{contentback}}</text>
					<image :src="src1" mode="aspectFit" v-if="imagesOrnot==='true'"></image>
					<!-- <image :src="src1" mode="aspectFit" ></image> -->
				</view>
				<!-- <text class="content-box-text" v-if="hackReset2">{{contentback}}</text> -->
				
				</uni-card>  
			
		</view>
	</view>
</template>

<script>
    import QSAnimation from '@/components/QS-Animation/QS-Animation.vue';
    import RenCalendar from '@/components/ren-calendar/ren-calendar.vue';
	import unicard from '@/components/uni-card/uni-card.vue'
        export default {
            components: {
                QSAnimation,
    			RenCalendar,
				unicard
            },
    		data() {
    	            return {
						src1:'',
    	                curDate:'',
    	                markDays:[],
						hackReset:true,
						hackReset2:true,
						contentback:'default',
						imagesOrnot:'false',
						list: [{
							id: 0,
							title: '',
							content: '',
							shadow: false,
							note: '',
							extra: '',
							thumbnail: ''
						
						}, {
							id: 1,
							title: '标题文字',
							content: '',
							shadow: true,
							note: '',
							extra: '额外信息',
							thumbnail: ''
						}, {
							id: 2,
							title: '标题文字',
							content: '',
							shadow: true,
							note: 'Tips',
							extra: '额外信息',
							thumbnail: ''
						}, {
							id: 3,
							title: '标题文字',
							content: '这是一个完整配置的基础卡片示例。内容样式可自定义。',
							shadow: true,
							note: 'Tips',
							extra: '额外信息',
							thumbnail: 'https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png'
						}],
						Tips: ['喜欢', '评论', '分享']
    	            }
    	        },
    		onReady() {
    		    let today = this.$refs.ren.getToday().date;
    		    this.curDate = today;
    		    this.markDays.push(today);
    		},
			
            methods: {
				clickCard() {
					console.log("doo");
					uni.showToast({
						title: '点击卡片',
						icon: 'none'
					})
				},
				update(){
					console.log("do");
					this.hackReset = false;
					this.hackReset2 = false;
					  this.$nextTick(() => {
					       this.hackReset = true;
						   this.hackReset2 = true;
						   this.contentback="default"
						   this.imagesOrnot='false'
					  })	 
							},
			footerClick(types) {
				uni.showToast({
					title: types,
					icon: 'none'
				})
			},	
                tap() {
                    uni.showToast({
                        title: '划过'
                    })
                },
    			gotoLunBo(){
    			    uni.navigateTo({
    			        // url: 'test?id=1&name=uniapp'  c传递参数
    			
    			        url:"../open/edit"
    			
    			    })
    			},
    			onDayClick(data){
    			    this.curDate = data.date;
					
				uniCloud.callFunction({
										name:"datecard",
										data:{
											date:this.curDate
										}
										
									}).then((res)=>{
										// console.log(this.curDate);
										
										console.log(res.result);
										if(res.result=='default'){
											
											this.contentback='default'
											this.src1=[]
											 this.imagesOrnot='false'
										}
										else{
											res=res.result;
										this.contentback=res.content;
										
										this.src1=res.images
										this.imagesOrnot='true'
										console.log(res.images);
										}
										
										
										
									});	
				 this.hackReset = false;
				   this.$nextTick(() => {
				        this.hackReset = true;
				 	   
				   })
    			}	
            },
				
        }
    	
</script>

<style lang="scss">
    page{
        // background-color: #f2f2f2;
    }
	.logo {
		height: 50rpx;
		width: 50rpx;
		margin-top: 50rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.content {
        // padding-top: 50rpx;
		.change{
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            // margin-top: 100rpx;
            height: 100rpx;
            color: #b89249;
            // background-color: #21191b;
			flex-direction: column;
        }
	}
	// .container {
	// 	padding: 0px;
	// 	font-size: 14px;
	// 	line-height: 24px;
	// 	height: 100vh;
	// 	display: flex;
	// 	flex-direction: column;
	// 	/* background-color: #006600; */
	// }
	.nav {
		// padding: 30rpx 30rpx 10rpx 30rpx;
		display: flex;
		justify-content: flex-end;
		// background-color: #aaaaff;
		/* border: #718C00 5px solid; */
		/* border-top: 3px #000066 solid; */
	}
	.nav > view {
		display:flex; 
		width: 30px;
		justify-content: flex-end;
		/* background-color: #aaaaff; */
		
	}
		
	
</style>
