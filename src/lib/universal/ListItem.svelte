<script>

	import utilities from '$lib/universal/utilities.js'
	import { onMount, onDestroy } from 'svelte'
	import Media from '$lib/universal/Media.svelte'
	import Timestamp from '$lib/universal/Timestamp.svelte'
	import { browser } from '$app/env'

	export let component
	export let index 
	export let data
	export let keys


	function filter( item ) {
		let o = {}
		keys.forEach( key => o[key] = item[key] )
		return o
	}


</script>

<section>
	<svelte:component this={component} {index} {...filter(data) } />
</section>

<!-- 

EXPLANATION:

component = SvelteComponent
index = integer
hidden = boolean (out of view)
centroid = boolean (is the most middle item)
 -->