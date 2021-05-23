<script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {
		console.log( '->', page.path )
		return { props: { data: await api.get( { info: '/info.json', pkg: '/pkg.json' }, fetch ) } }
	}
</script>


<script>
	import { browser, dev } from '$app/env'
	import Logo from '$lib/Logo.svelte'
	import { eze, burger, pkg, info } from '$lib/universal/stores.js'
	import { dark } from '$lib/rad-and-cool-icons/lib/stores.js'
	import { onMount } from 'svelte'
	import Title from '$lib/Title.svelte'
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
	import { All } from '$lib/rad-and-cool-icons/lib'

	import LayoutTwoCol from '$lib/universal/LayoutTwoCol.svelte'
	import LayoutTopBar from '$lib/universal/LayoutTopBar.svelte'

	import ReDesign from '$lib/universal/ReDesign.svelte'

	let orientation = 'column'
	let component = orientation == 'row' ? LayoutTwoCol : LayoutTopBar

	export let data
	info.set({ ...data.info[0] })
	pkg.set({ ...data.pkg })
	eze.set(  {
		api: 'http://mac.local:3000/api/autr/',
		editor: 'http://localhost:5000/autr/',
		project: '/Users/gilbert/Code/tv/',
		assets: '/static',
		copy: dev || !browser
	})

	let layout = 'two-col'
	layout = 'top-bar'
	
	let el



</script>

<svelte:head>
	<meta name="author" content="Gilbert Sinnott">
	<meta name="description" content="Gilbert Sinnott">
	<meta name="theme-color" content="#F986D2" />
</svelte:head>

<main bind:this={el} class="sassis f1 w100vw h100vh orientation-{orientation}" class:dark={$dark}>
	<svelte:component this={component} >
		<div id="top" slot="header" class="flex">

			<Header {orientation} />
		</div>

		<div slot="body" class="flex column-stretch-flex-start grow rel mlr1">
			<slot />
		</div>
		<div slot="footer">
			<Footer {orientation} />
		</div>
	</svelte:component>
</main>


<ReDesign {el} />