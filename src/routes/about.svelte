<script context="module">

	const INPUT = `http://localhost:3000/api/autr/items/about?depth=3`
	const OUTPUT = `/about.json`

	import { browser } from '$app/env'
	import fs from 'fs'
	import path from 'path'
	export const load = async ({ fetch, page }) => {
		let res 

		if (!browser) {
			const save = path.resolve( path.join( './static/', OUTPUT))
			res = await fetch( INPUT  )
			let data = (await res.json())[0]
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
	import Title from '$lib/Title.svelte'
	import Media from '$lib/universal/Media.svelte'
	export let data

	$: sets = {
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
	<div class="flex column-start-start grow no-basis cmb2">
		<pre>{@html data.bio}</pre>
		<a class="button text-center">Email</a>
		<a class="button text-center">CV</a>
	</div>
	<div class="space w4em" />
	<div class="flex column grow">
		{#each Object.entries( sets ) as [ type, data ] }

			{#each data.links as link}
				<a 
					class="lowercase"
					href={link.item.href} 
					title={link.id}>{link.item.text}</a>
			{/each}

		{/each}

	</div>


</div>