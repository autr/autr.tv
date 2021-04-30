const static = require('@sveltejs/adapter-static')
const pkg = require('./package.json')
const sveltePreprocess = require('svelte-preprocess')

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: static(),
		target: '#svelte',
		ssr: true
	}
}
