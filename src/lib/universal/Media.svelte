<script>

	import { scroll, centroid } from '$lib/universal/store.js'
	import { onMount, onDestroy } from 'svelte'
	import { amp, browser, dev, prerendering } from '$app/env'
	import { getStores, navigating, page, session } from '$app/stores'
	import { base, assets } from '$app/paths'
	import Vimeo from '$lib/universal/Vimeo.svelte'

	export let file
	export let autohide = false // set to an id to enable
	export let format = ''
	export let hidden = autohide ? true : false
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

	const thumbnail = (url, o) => {

		const idx = url.lastIndexOf('.')
		const out = url.slice( 0, idx ) + `.${o?.width || 0}x${o?.height || 0}x${o?.quality || 80}x${o?.fit || 'cover'}` + url.slice( idx )
		return out
	}

	const wait = async ms => ( new Promise(resolve => setTimeout(resolve, ms) ) )
	async function sync( file_ ) {


		if (file?.basename && file?.location) {

			dimensions( file )

			const basename = file.basename
			const location = root || '/' + file.location.name + '/'
			const idx = basename.lastIndexOf('.')
			const name = basename.slice( 0, idx )
			const ext = basename.slice( idx )
			let fmt = format
			if (fmt?.length > 0) fmt = '.' + fmt

			if (!is('image')) fmt = ''

			src = location + name + fmt + ext

		}

	}

	$: sync( file )
	$: title = file.title
	$: alt = ((file?.title || autohide || file?.basename) || '')

	export let width = null, height = null, ratio = null

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

	let el

	function update( scroll_, centroid_ ) {

		if (!browser || !autohide) return
		const rect = el?.getBoundingClientRect() || {}
		const TEST = autohide == 'moire-effekt-moire-moire-pattern-video-circuits-video-art-media-0'
		const top = scroll_.itemsTop

		if (browser) {
			const offset = -window.innerHeight

			const top = rect.y * -1 > rect.height - offset
			const bottom = rect.y > window.innerHeight - offset
			hidden = top || bottom

			const ID = $centroid?.id || 'undefined-centroid'
			const CENTER = $centroid?.center || 999999999

			const center = Math.abs( ( rect.y + (rect.height / 2) ) - (window.innerHeight / 2) )

			if ( autohide == ID && center != CENTER ) {
				// console.log(`[PostItem] ☯️  updating centroid  "${autohide}" ${Math.random()}`)
				$centroid = { center, id: autohide }
			}

			if ( center < CENTER && ID != autohide ) {
				console.log(`[PostItem] ✨☯️✨  switching to new centroid "${autohide}" with size: ${width}/${height} (${ratio.toFixed(2)})`)
				$centroid = { center, id: autohide }
			}
		}

		// hidden = $centroid.id != autohide
		// // hidden = false
		paused = $centroid.id != autohide
	}
	$: update( $scroll, $centroid )

	$: color = colors?.vibrant || 'var(--color)'
	$: cross = `background-image: linear-gradient(to top left, transparent 0%, transparent calc(50% - var(--stroke-width)), ${color} 50%, transparent calc(50% + var(--stroke-width)), transparent 100%), linear-gradient(to top right, transparent 0%, transparent calc(50% - var(--stroke-width)), ${color} 50%, transparent calc(50% + var(--stroke-width)), transparent 100%);box-shadow:inset 0px 0px 0px 1px ${color}`


	const pixel = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
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
	bind:this={el}
	class="media block rel w100pc {class_}"
	data-width={width}
	data-height={height}
	data-ratio={ratio}
	style={`
		${style_};
		${cross};
		
	`}>
		{#if is('image') }
			<img 
				class="embed fill w100pc h-auto"
				class:active={!hidden}
				{width}
				{height} 
				src={ hidden ? pixel : src }
				{title} {alt}  />
		{:else if is('video')} 
			<video 
				class="embed fill w100pc h-auto"
				class:active={!hidden}
				class:playing={!paused}
				class:paused={paused}
				{width}
				{height} 
				src={ hidden ? pixel : src }
				{muted}
				{autoplay}
				{loop}
				bind:paused={ paused }
				preload={ hidden ? 'none' : 'auto' }
				controls={false}
				poster={thumb}
				{title} {alt}  />
		{:else if is('vimeo')}
			<Vimeo 
				{...$$props} 
				bind:width={width} 
				bind:height={height} 
				bind:ratio={ratio} />
		{/if}
		<img 
			class="hidden w100pc h-auto"
			{width}
			{height} />
</span>