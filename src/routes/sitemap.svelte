<script context="module">

	const jsons = ['about', 'info', 'feed']

	export const load = async ({ fetch, page }) => {

		let data = {}
		let message
		for (let i = 0; i < jsons.length; i++) {
			const id = jsons[i]
			const url = `/${id}.json`
			const res = await fetch( url  )
			if (res.ok) data[id] = await res.json()
			if (!res.ok) message = { message } = await res.text()
		}

		if (message) return { error: new Error(message) }
		return { props: { data } }
	}
</script>

<script>
	export let data
	import Timestamp from '$lib/universal/Timestamp.svelte'

	$: feed = (data?.feed || []).sort( (a,b) => b.date - a.date )

	function url(item) { 
		return `/feed/${(new Date( item.date * 1000)).getFullYear()}/${item.id}`
	}
</script>

<nav class="flex row">


	<!-- {#each Object.entries(data) as [name, o] }
		<div class="grow no-basis flex column"> -->
			<h2></h2>
			<div class="flex column-stretch-start grow">
				{#each Object.entries( data?.feed || {} ) as [id, item]}
					<!-- <a class="ptb0-5 flex row-space-between-center f1" href={url(item)}>
						<span class="monospace grow">{url(item)}</span>
						<Timestamp date={item.date} class="f0 bold uppercase" />
					</a> -->
				{/each}
			</div>
		<!-- </div>

	{/each} -->


</nav>