<script>
	import { onMount, onDestroy } from 'svelte'
	import { amp, browser, dev, prerendering } from '$app/env'
	import { getStores, navigating, page, session } from '$app/stores'
	import { base, assets } from '$app/paths'

	export let file
	export let format
	export let active = false
	export let paused = true
	export let autoplay = false
	export let muted = true
	export let loop = true

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }


	let src, thumb
	let syncing = false

	const wait = async ms => ( new Promise(resolve => setTimeout(resolve, ms) ) )
	async function sync( file_ ) {


		if (file) {

			dimensions( file )

			if (!format) format = `${width}x${height}x95`

			const basename = file.basename
			const location = file.location.name
			const i = basename.lastIndexOf('.')
			const name = basename.slice( 0, i )
			const ext = basename.slice( i )
			const destination = file.location.destination
			const ii = destination.lastIndexOf('/')
			const alt = destination.substring( ii + 1)
			thumb = '/' + alt + '/' + name + '.' + format + '.jpg'
			src = '/' + alt + '/' + name  + ext
		}

		if (file && !browser) {
			syncing = true
			try {
				console.log('[Media.svelte] 🖼  syncing file into folder ->', basename)
				// const a = await fetch( thumb )
				// const b = await fetch( src )
				// console.log(a.ok, b.ok)
				const og = 'http://localhost:3000/api/autr/files/' + file.id 
				const trigger = og + '?thumbnail=' + format 
				await fetch( og )
				await fetch( trigger )

			} catch( error ) {
				// console.error('[Media.svelte] 🖼  ', error )
			}
			syncing = false 
		}
	}

	$: sync( file )
	$: title = file.title
	$: alt = file.title

	if (prerendering) {


		console.log('MEDIA PRERENDERING!!!!!!!')
	}



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

	let error = false

	function onError( e ) {
	}
	function onLoad( e ) {
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
	style={`
		${style_};
		line-height: 0px;
		background-color:${colors?.vibrant || `#111`};
		
	`}>
		{#if is('image') }
			<img 
				{width}
				{height} 
				{src}
				class="fill"
				class:hidden={syncing}
				on:error={onError} 
				on:load={onLoad}
				{title} {alt}  />
		{:else if is('video')} 
			<video 
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
				class="fill"
				class:hidden={syncing}
				on:error={onError} 
				on:load={onLoad}
				{title} {alt}  />
		{/if}
		<img 
			class="hidden w100pc h-auto"
			{width}
			{height} 
			{src}  />
</span>