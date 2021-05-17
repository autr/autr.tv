<script context="module">

	const INPUT = `http://localhost:3000/api/autr/items/posts?depth=2`
	const OUTPUT = `/feed.json`

	import { browser, prerendering, dev } from '$app/env'
	import fs from 'fs'
	import path from 'path'
	export const load = async ({ fetch, page }) => {
		let res 

		if (!browser && dev ) {
			const save = path.resolve( path.join( './static/', OUTPUT))
			res = await fetch( INPUT  )
			let data = (await res.json()).sort( (a,b) => b.date - a.date )
			return { props: { data } }

			const url = item => `/feed/${(new Date( item.date * 1000)).getFullYear()}/${item.id}`

			for (let i = 0 ; i < data.length; i++ ) {
				const prev = i == 0 ? data.length - 1 : i - 1
				const next = i == data.length - 1 ? 0 : i + 1
				data[i].prev = url( data[prev] )
				data[i].next = url( data[next] )
			}

			if (res.ok) {
				const written = await fs.writeFileSync( save, JSON.stringify(data, null, 2) )
				return { props: { data } }
			}
		} else {
			res = await fetch( OUTPUT  )
			const data = await res.json()
			if (res.ok) return { props: { data } }
		}
		const { message } = await res.json()
		return { error: new Error(message) }
	}
</script>

<script>
	import { page } from '$app/stores'
	import { onMount, onDestroy } from 'svelte'
	import utilities from '$lib/universal/utilities.js'

	import ListView from '$lib/universal/ListView.svelte'
	import PostItem from '$lib/PostItem.svelte'

	export let data
	const keys = ['id', 'created', 'updated', 'files', 'text', 'original', 'embed', 'date', 'status']

	let posts = []

	function filter( year ) {
		posts = utilities.posts( data, $page.params.year )
	}

	$: filter( $page.params.year )

	onMount( async e => {
	})
	onDestroy( async e => { 
	})

	const href = year => `/feed/${year}`
</script>

<nav class="flex  ptb0-5 row-space-between-center  bt1-solid  bb1-solid  wrap">
	<div class="flex row wrap">
		{#each posts.years as year}
			<a 
				class="unclickable checkbox mtb0-5"
				href={ href( year ) }>
				<input 
					type="checkbox" 
					checked={ $page.params.year == year || (!$page.params.year && year == 'all') } />
				<span />
				{year}
			</a>
		{/each}
	</div>
	<a class="bb1-solid button text-center ptb0-2 plr2 mtb0-5" href="">random</a>
</nav>
<slot />

<ListView
	class="mt2"
	data={ posts.data }
	{keys}
	component={PostItem}>
</ListView>