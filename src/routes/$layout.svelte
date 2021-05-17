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

	const darkKey = browser ? window.location.host + '-darkmode' : undefined

	function initDark() {
		let out = browser ? eval( window.localStorage.getItem( darkKey ) ) : undefined
		if ( browser && out != true && out != false ) out = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || false
		return out
	}

	let dark = initDark()

	function onDarkChange( dark_ ) {
		if (browser ) window.localStorage.setItem( darkKey, dark )
	}
	function clearDark() {
		if (browser) window.localStorage.removeItem( darkKey )
	}

	$: onDarkChange( dark )

	export let data


	let layout = 'two-col'
	layout = 'top-bar'

</script>

<main class:dark={dark}>
	{#if layout == 'two-col'}
		<LayoutTwoCol>
			<div slot="left" class="flex column-stretch-space-between grow">
				<header>
					<Header {...data} bind:dark={dark} />
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
				<Header {...data} bind:dark={dark} orientation="row" />
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