<script context="module">

	export const load = async ({ fetch, page }) => {
		const res = await fetch( `http://localhost:3000/api/autr/items/about?depth=2`  )
		let data = (await res.json())[0]
		if (res.ok) return { props: { data } }
		const { message } = await res.json()
		return { error: new Error(message) }
	}

</script>

<script>
	import Title from '$lib/Title.svelte'
	import Media from '$lib/universal/Media.svelte'
	export let data

	$: links = {
		good: {
			links: data['good-links']
		},
		neutral: {
			links: data['neutral-links']
		},
		bad: {
			links: data['bad-links']
		}
	}

</script>


<div class="flex row">
	<div class="flex column grow">
		<Title>Bio</Title>
	</div>
	<div class="flex column grow">
		<Title>Links</Title>
		{#each Object.entries( links ) as [ type, links ] }

			


		{/each}

	</div>


</div>