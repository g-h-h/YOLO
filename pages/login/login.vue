<template>
  <view class="content">
    <view class="header">
      <image src="../../static/shilu-login/logo.png"></image>
	  
    </view>

    <view class="list">
      <view class="list-call">
        <image class="img" src="/static/shilu-login/1.png"></image>
        <input class="sl-input" v-model="phone" type="number" maxlength="11" placeholder="输入手机号" />
      </view>
      <view class="list-call">
        <image class="img" src="/static/shilu-login/2.png"></image>
        <input class="sl-input" v-model="password" type="text" maxlength="32" placeholder="输入密码" password="true" />
      </view>

    </view>

    <!-- <view class="button-login" hover-class="button-hover" @tap="bindLogin()"> -->
	<view class="button-login" hover-class="button-hover">
	  <text @click="jiancha">登录</text>
    </view>

    <view class="agreenment">
      <navigator url="../modify/modify" open-type="navigate">修改密码</navigator>
      <text>|</text>
      <navigator url="../register/register" open-type="navigate">注册账户</navigator>
    </view>
  </view>
</template>

<script>
	import helper from '../../common/helper.js'
  export default {	  
    data() {
      return {
        phone: '',
        password: ''
      };
    },
    methods: {
		jiancha(){
			helper.yonghu1=this.phone;
			uniCloud.callFunction({
				name:'HM_denglu',
				data:{
					phone:this.phone,
					password:this.password
				}
			}).then((res)=>{
				if(res.result=="zhengque"){
					uni.showToast({
						title:'登录成功'
					}),
					setTimeout(()=>{
					  uni.navigateTo({
					  	// url:'../index/index',
						url:'../calendar/calendar'
					  })
					},2000)
				}
				else if(res.result=="bucunzai"){
					uni.showToast({
						title:'账号不存在',
						icon:"none"
					})
				}
				else{
					uni.showToast({
						title:'密码错误',
						icon:"none"
					})
				}
			})
		},
      bindLogin() {
        if (this.phone.length != 11) {
          uni.showToast({
            icon: 'none',
            title: '手机号不正确'
          });
          return;
        }
        // if (this.password.length < 6) {
        //   uni.showToast({
        //     icon: 'none',
        //     title: '密码不正确'
        //   });
        //   return;
        // }
        // uni.request({
        //   url: 'http://***/login.html',
        //   data: {
        //     phone: this.phone,
        //     password: this.password
        //   },
        //   method: 'POST',
        //   dataType: 'json',
        //   success: (res) => {
        //     if (res.data.code != 200) {
        //       uni.showToast({
        //         title: res.data.msg,
        //         icon: 'none'
        //       });
        //     } else {
        //       //成功后的逻辑
        //       uni.navigateBack();
        //     }
        //   }
        // });

      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .header {
    width: 161rpx;
    height: 161rpx;
    background: rgba(63, 205, 235, 1);
    box-shadow: 0rpx 12rpx 13rpx 0rpx rgba(63, 205, 235, 0.47);
    border-radius: 50%;
    margin-top: 30rpx;
    margin-left: auto;
    margin-right: auto;
  }

  .header image {
    width: 161rpx;
    height: 161rpx;
    border-radius: 50%;
  }

  .list {
    display: flex;
    flex-direction: column;
    padding-top: 50rpx;
    padding-left: 70rpx;
    padding-right: 70rpx;
  }

  .list-call {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 100rpx;
    color: #333333;
    border-bottom: 0.5px solid #e2e2e2;
  }

  .list-call .img {
    width: 40rpx;
    height: 40rpx;
  }

  .list-call .sl-input {
    flex: 1;
    text-align: left;
    font-size: 32rpx;
    margin-left: 16rpx;
  }

  .button-login {
    color: #FFFFFF;
    font-size: 34rpx;
    width: 470rpx;
    height: 100rpx;
    background: linear-gradient(-90deg, rgba(63, 205, 235, 1), rgba(188, 226, 158, 1));
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(164, 217, 228, 0.2);
    border-radius: 50rpx;
    line-height: 100rpx;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100rpx;
  }

  .button-hover {
    background: linear-gradient(-90deg, rgba(63, 205, 235, 0.8), rgba(188, 226, 158, 0.8));
  }

  .agreenment {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
    margin-top: 80rpx;
    color: #FFA800;
    text-align: center;
    height: 40rpx;
    line-height: 40rpx;
  }

  .agreenment text {
    font-size: 24rpx;
    margin-left: 15rpx;
    margin-right: 15rpx;
  }
</style>
