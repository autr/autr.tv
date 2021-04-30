<script context="module">
	import api from '$lib/api.js'
	export const load = api.get( params => 'http://localhost:3000/api/autr/items/posts?depth=2' )
</script>
<script>
	import { page } from '$app/stores'
	import { onMount, onDestroy } from 'svelte'
	import utilities from '$lib/universal/utilities.js'

	import ListView from '$lib/universal/ListView.svelte'
	import PostItem from '$lib/PostItem.svelte'

	export let data
	const keys = ['id', 'created', 'updated', 'files', 'text', 'title', 'original']

	let lastYear, currentYear
	function update( p ) {
		const y = p.params.year
		if (currentYear == undefined) currentYear = y
		if ( p.params.id ) currentYear = lastYear
		lastYear = p.params.year
	}

	let unsubscribe = page.subscribe( update )

	onMount( async e => {
	})
	onDestroy( async e => {
		if ( unsubscribe ) unsubscribe()
	})

	const href = year => `/feed/${year}`
</script>

<nav class="cmr1 pb2">
	{#each utilities.posts( data, $page.params.year ).years as year}
		<a 
			class:filled={ $page.path == href(year) || $page.path + '/all' == href( year )}
			class="p0-6 plr1 unclickable"
			svelte:prefetch 
			href={ href( year ) }>
			{year}
		</a>
	{/each}
</nav>
<slot />

<ListView
	data={ utilities.posts( data, $page.params.year ).data }
	{keys}
	component={PostItem}>
</ListView>