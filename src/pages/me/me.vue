<template>
	<div class="container">
		<div class="userinfo" @click='login'>
			<img :src="userinfo.avatarUrl">
			<p>{{userinfo.nickName}}</p>
			<button v-if='!userinfo.openId' open-type='getUserInfo' type='primary' @getuserinfo='login'>登陆</button>
		</div>
		<YearProgress />
		<button v-if='userinfo.openId' type="primary" class="btn" @click='scanBook'>添加图书</button>
	</div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import  config from '@/config'
import { showSuccess, showFail, showModal,post } from '@/utils/util'
import YearProgress from '@/components/YearProgress'

export default {
	data() {
		return {
			userinfo: {
				avatarUrl: '../../../static/img/unlogin.png'
			}
		}
	},
	methods: {
		async addBook(isbn) {
			const res = await post('/weapp/addbook', {
				isbn,
				openid: this.userinfo.openId
			})
			showModal('添加成功', `${res.data.title}添加成功`)
		},
		scanBook() {
			wx.scanCode({
				success: res => {
					if(res.result) {
						this.addBook(res.result)
					}
				}
			})			
		},
		login() {
			let user = wx.getStorageSync('userinfo')
			const self = this
			if(!user) {
				qcloud.setLoginUrl(config.loginUrl)
				qcloud.login({
					success: userInfo => {
						qcloud.request({
							url: config.userUrl,
							login: true,
							success: userRes => {
								console.log('登陆成功', userInfo)
								showSuccess('登录成功')
								wx.setStorageSync('userinfo',userInfo)
								self.userinfo = userRes.data.data
							}
						})
					},
					fail: err => {
						showFail('登陆失败')
						console.log(err)
					}
				})
			}
		}
	},
	components: {
		YearProgress
	},
	onShow() {
		let userinfo = wx.getStorageSync('userinfo')
		if(userinfo) {
			this.userinfo = userinfo
		}
	}
}	
</script>

<style lang='scss' scoped>
.container {
	padding: 0 30rpx;
	.userinfo {
		margin-top: 100rpx;
		margin-bottom: 50rpx;
		text-align: center;
		img {
			width: 150rpx;
			height: 150rpx;
			margin: 5rpx;
			border-radius: 50%;
		}
		button {
			width: 15vw;
			background-color: #fff;
			color: #000;
			font-size: 14px;
		}
	}
}

</style>