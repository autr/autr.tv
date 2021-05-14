<script context="module">
	import { amp, browser, dev, prerendering } from '$app/env'
	import api from '$lib/api.js'

	export const load = api.get( params => 'http://localhost:3000/api/autr/items/info?depth=1', 0 )

</script>

<script>

	import { onMount } from 'svelte'
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
	import LayoutTwoCol from '$lib/universal/LayoutTwoCol.svelte'
	import LayoutTopBar from '$lib/universal/LayoutTopBar.svelte'

	export let data


	let layout = 'two-col'
	layout = 'top-bar'

</script>

<main>

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
			<div slot="body" class="flex column-stretch-center grow">
				<slot />
			</div>
		</LayoutTopBar>
	{:else}
		Layout not set
	{/if}
</main>