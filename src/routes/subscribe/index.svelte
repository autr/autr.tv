<script context="module">
	export const prerender = false
</script>

<script>
	import { onMount } from 'svelte'
	import ListSignup from '$lib/ListSignup.svelte'
	import LayoutCentered from '$lib/universal/LayoutCentered.svelte'
	import Title from '$lib/Title.svelte'

	let vars = { artworks: true }

	const sleep = ms => new Promise(f => setTimeout(f, ms));


	onMount(async () => {
	})

</script>

<svelte:head>
	<title>Autr | Newsletter & Mailing List</title>
</svelte:head>
<div id="subscribe-page" class="grow ptb1 sm-max-100 flex column-start-center margin-auto">
	<Title>Mailing List</Title>
	<p class="ptb1">

	</p>
	<ListSignup  />
	<span class="h20em sm-max-none" />
</div>