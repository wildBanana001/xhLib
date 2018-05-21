//工具函数库
import config from '../config'

export function request(url, method, data, header={}) {
	return new Promise((reslove, reject) => {
		wx.request({
			data,
			method,
			header,
			url: config.host + url,
			success: res => {
				if(res.data.code === 0) {
					reslove(res.data.data)
				} else {
					console.log(res)
					// showModal('失败',res.data.data.msg)
					// reject(res.data)
				}
			}
		})
	})
}

export function get(url, data) {
	return request(url, 'GET', data)
}

export function post(url,data) {
	return request(url, 'POST', data)
}

export function showModal (title, content) {
	wx.showModal({
		title,
		content,
		showCancel: false
	})
}

export function showSuccess (text) {
	wx.showToast({
		title: text,
		icon: 'success'
	})
}

export function showFail (text) {
	wx.showToast({
		title: text,
		icon: 'none',
		duration: 2000
	})
}