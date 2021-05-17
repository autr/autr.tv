<script>
	import { onMount, onDestroy } from 'svelte'
	import { scroll } from '$lib/universal/store.js'
	import { browser } from '$app/env'
	import ListItem from './ListItem.svelte'

	export let component
	export let keys
	export let data
	export let max = 10

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

	let timestamp = new Date()
	function update( scroll_ ) {

		// handling $scroll

		if (browser) {
			if ( scroll_.itemsTop > scroll_.itemsHeight - (window.innerHeight * 1.5) ) {
				const t = new Date()
				if (t - timestamp > 500) {
					// count += max
					timestamp = t
				}
			}
		}

	}

	let timeout, refresh
	function changed( data_ ) {
		// refresh = true
		// if (timeout) clearTimeout( timeout )
		// timeout = setTimeout( e => refresh = false, 10 )
	}

	$: changed( data )

	let unsubscribe

	onMount( async e => {
		update( $scroll ) 
		unsubscribe = scroll.subscribe( update )
	})
	onDestroy( async e => unsubscribe )


	let count = max
</script>

<div 
	class="flex column grow {class_}"
	style={style_}>
	<slot name="body" />
	{#each data.slice(0, count) as item, index}
		{#if !refresh}<ListItem {index} {component} {keys} data={item} />{/if}
	{/each	}
	<footer>
		<slot name="load-more" />
		<slot name="back-to-top" />
	</footer>
</div>