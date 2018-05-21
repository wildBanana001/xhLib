import Vue from 'vue'
import App from './book'

const app = new Vue(App)
app.$mount()

export default {
	config: {
		enablePullDownRefresh: true
	}
}
