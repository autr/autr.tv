<script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {
		return { props: { data: await api.get( { about: '/about.json' }, fetch ) } }
	}
</script>


<script>
	import { onMount } from 'svelte'
	import ListSignup from '$lib/ListSignup.svelte'
	import Media from '$lib/universal/Media.svelte'
	import LayoutCentered from '$lib/universal/LayoutCentered.svelte'
	import Title from '$lib/Title.svelte'

	let vars = { artworks: true }

	export let data
	$: about = data.about[0]

	const sleep = ms => new Promise(f => setTimeout(f, ms));


	onMount(async () => {
	})

</script>

<svelte:head>
	<title>Autr | Newsletter & Mailing List</title>
</svelte:head>
<div id="subscribe-page" class="grow ptb1 sm-max-100 flex row-start-start margin-auto">
	<!-- <div class="mailing-list-media mr1 basis0"> 
		<Media file={about.cover[2]} format="996x0x95xfit" root="/pages/" class="" />
	</div> -->
	<div class="flex grow column cmb1">
		<Title>Mailing List</Title>
		<p>
			Email preferences can be set for artworks / news, code and open source projects, and personal stuff (cool linkz, bicycles, etc).
		</p>
		<ListSignup  />
	</div>
</div>