export default {
	...process.env, // 从webpack注入进version，name，date等数据


	/* eslint-disable */
	serviceType: { alias: 'OneHUb', value: 3 },

	loading: {
		enable: true,
		img: 'https://sdkcdn.videojj.com/liveos-sdk/static/loading.gif',
	},
}