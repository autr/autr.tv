<script>

	import { scroll, centroid } from '$lib/universal/store.js'
	import utilities from '$lib/universal/utilities.js'
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/env'
	import Media from '$lib/universal/Media.svelte'
	import Timestamp from '$lib/universal/Timestamp.svelte'

	export let component
	export let index 
	export let data
	export let keys

	function update( o ) {

		if (!index) return
		const rect = el?.getBoundingClientRect() || {}
		if (browser) {
			if (offset == undefined) offset = 0
			hidden = (rect.y * -1 > rect.height - offset) || (rect.y > window.innerHeight - offset)
			const currentCenter = $centroid.center || 999999999
			const currentIdx = $centroid.index
			const center = Math.abs( ( rect.y + (rect.height / 2) ) - (window.innerHeight / 2) )
			if ( index == currentIdx && center != currentCenter ) {
				// console.log('[PostItem] ☯️  updating centroid:', index)
				$centroid = { center, index }
			}
			if ( center < currentCenter && currentIdx != index ) {
				console.log('[PostItem] ✨☯️✨  switching to new centroid:', index)
				$centroid = { center, index }
			}
		}
	}

	function filter( item ) {
		let o = {}
		keys.forEach( key => o[key] = item[key] )
		return o
	}


	onMount( async e => {
		unsubscribe = scroll.subscribe( update )
		update( $scroll )
	})

	onDestroy( async e => {
		if ( unsubscribe ) await unsubscribe()
	})

	let el, unsubscribe, offset
	let hidden = true
	$: focus = $centroid?.index == index && index != undefined


</script>

<section bind:this={el}>
	<svelte:component this={component} {index} {hidden} {focus} {...filter(data) } />
</section>

<!-- 

EXPLANATION:

component = SvelteComponent
index = integer
hidden = boolean (out of view)
centroid = boolean (is the most middle item)
 -->