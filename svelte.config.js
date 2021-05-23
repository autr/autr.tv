import adapter from '@sveltejs/adapter-static'


/** @type {import('@sveltejs/kit').Config} */

const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		ssr: true,
		files: {
			assets: 'static'
		},
		prerender: {
			crawl: true
		},
		router: process.env.NODE_ENV == 'development' ? false : true
	}
}

export default config