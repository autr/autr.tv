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

	$: posts = utilities.posts( data, $page.params.year )

	onMount( async e => {
	})
	onDestroy( async e => { 
	})

	const href = year => `/feed/${year}`
</script>

<nav class={`
	flex 
	ptb0-5
	row-space-between-center 
	bt1-solid 
	bb1-solid 
	wrap
	`}>
	<div class="flex row wrap">
		{#each posts.years as year}
			<a 
				class="unclickable checkbox mtb0-5"
				href={ href( year ) }>
				<input type="checkbox" checked={ $page.path == href(year) } />
				<span />
				{year}
			</a>
		{/each}
	</div>
	<a class="bb1-solid button text-center ptb0-2 plr2 mtb0-5" href="">random</a>
</nav>
<slot />

<ListView
	data={ posts.data }
	{keys}
	component={PostItem}>
</ListView>