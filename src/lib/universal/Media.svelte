<script>
	import { onMount, onDestroy } from 'svelte'
	import { amp, browser, dev, prerendering } from '$app/env'
	import { getStores, navigating, page, session } from '$app/stores'
	import { base, assets } from '$app/paths'

	export let file
	export let format = ''
	export let active = false
	export let paused = true
	export let autoplay = false
	export let muted = true
	export let loop = true
	export let root = null

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }


	let src, thumb
	let syncing = false

	const thumbnail = (url, o) => {

		const idx = url.lastIndexOf('.')
		const out = url.slice( 0, idx ) + `.${o?.width || 0}x${o?.height || 0}x${o?.quality || 80}x${o?.fit || 'cover'}` + url.slice( idx )
		return out
	}

	const wait = async ms => ( new Promise(resolve => setTimeout(resolve, ms) ) )
	async function sync( file_ ) {


		if (file) {

			dimensions( file )

			const basename = file.basename
			const location = root || '/' + file.location.name + '/'
			const idx = basename.lastIndexOf('.')
			const name = basename.slice( 0, idx )
			const ext = basename.slice( idx )

			console.log(basename, location, idx, name, ext)

			src = location + name + format + ext

		}

	}

	$: sync( file )
	$: title = file.title
	$: alt = file.title

	let width, height, ratio

	function dimensions( file_ ) {
		try {
			if (is('image')) {
				const s = file.exif[0].ImageSize.split('x')
				width = parseInt( s[0] )
				height = parseInt( s[1] )
			}
			if (is('video')) {
				file.ffprobe.streams.forEach( stream => {
					if (stream?.width != undefined) width = stream.width
					if (stream?.height != undefined) height = stream.height
				})
			}

			ratio = (height/width) * 100
		} catch(err) {
			console.error( err )
		}
	}

	$: dimensions( file )

	function colors_( file_ ) {
		if (!file?.vibrant) return {}
		let o = {}
		for (const [key, value] of Object.entries( file.vibrant )) {
			o[key.toLowerCase()] = `rgb(${value.rgb.join(',')})`
		}
		return o

	}

	$: colors = colors_( file )


	const is = str => file.mime.indexOf(str) != -1

</script>

<!-- 
		background:linear-gradient(45deg, ${colors?.vibrant}, ${colors?.lightvibrant});
		background: repeating-linear-gradient(
			0deg,
			${colors?.vibrant} 0px,
			${colors?.vibrant} 1px,
			${colors?.darkvibrant} 1px,
			${colors?.darkvibrant} 2px
		);
		padding-top:${ratio()}%; 
		background: repeating-linear-gradient(
			0deg,
			${colors?.vibrant} 0px,
			${colors?.vibrant} 1px,
			${colors?.darkvibrant} 1px,
			${colors?.darkvibrant} 2px
		);


 -->


<span 
	class="block rel w100pc {class_}"
	data-width={width}
	data-height={height}
	data-ratio={ratio}
	style={`
		${style_};
		line-height: 0px;
		background-color:${colors?.vibrant || `#111`};
		
	`}>
		{#if is('image') }
			<img 
				class="w100pc h-auto"
				{width}
				{height} 
				{src}
				{title} {alt}  />
		{:else if is('video')} 
			<video 
				class="w100pc h-auto"
				{width}
				{height} 
				{src}
				{muted}
				{autoplay}
				{loop}
				bind:paused={ paused }
				preload="auto"
				controls={false}
				poster={thumb}
				{title} {alt}  />
		{/if}
</span>