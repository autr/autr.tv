<script context="module">

	const INPUT = `http://localhost:3000/api/autr/items/info?depth=1`
	const OUTPUT = `/info.json`

	import { browser, dev } from '$app/env'
	import fs from 'fs'
	import path from 'path'
	export const load = async ({ fetch, page }) => {
		console.log('->', page.path)
		let res 
		if (!browser && dev) {
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

	import { dark } from '$lib/rad-and-cool-icons/lib/stores.js'
	import { onMount } from 'svelte'
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
	import LayoutTwoCol from '$lib/universal/LayoutTwoCol.svelte'
	import LayoutTopBar from '$lib/universal/LayoutTopBar.svelte'

	export let data

	let layout = 'two-col'
	layout = 'top-bar'

</script>

<main class="sassis" class:dark={$dark}>
	{#if layout == 'two-col'}
		<LayoutTwoCol>
			<div slot="left" class="flex column-stretch-space-between grow">
				<header>
					<Header {...data} />
				</header>
				<Footer />
			</div>
			<div slot="right">
				<slot />
			</div>
		</LayoutTwoCol>
	{:else if layout == 'top-bar'}

		<LayoutTopBar>
			<header slot="header" class="flex row-space-between-center">
				<Header {...data} orientation="row" />
			</header>

				<!-- <Footer /> -->
			<div slot="body" class="flex column-stretch-flex-start grow pt1">
				<slot />
			</div>
		</LayoutTopBar>
	{:else}
		Layout not set
	{/if}
</main>