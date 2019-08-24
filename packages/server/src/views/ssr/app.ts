const Vue = require('vue');

export default  function createApp(context) {
	// @ts-ignore
	return new Vue({
		data: {
			message: context.message,
		},
		template: '<div id="message">{{ message }}</div>',
	});
};
