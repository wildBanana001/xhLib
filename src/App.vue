<script>
import { get } from './utils/util'

export default {
	async created() {
		// wx.request({
		// 	url: config.host + '/weapp/demo',
		// 	success: res => {
		// 		console.log(res)
		// 	}
		// })

		const res = await get('/weapp/demo')
		console.log(123,res)

		console.log('app start!')
	}
}
</script>

<style>

</style>
