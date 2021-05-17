<script context="module">
	export const prerender = false
</script>

<script>
	import { onMount } from 'svelte'
	import Title from '$lib/Title.svelte'
	import { ListSignup } from '$lib/ezelte/lib'
	const config = {
		root: 'http://api.autr.tv',
		user: 'autr',
		interests: [ 
			{
				key: 'artworks',
				text: 'news'
			}, {
				key: 'code',
				text: 'open source'
			}, {
				key:'personal',
				text: 'miscelleny'
			}
		]
	}

	let vars = { artworks: true }

	const sleep = ms => new Promise(f => setTimeout(f, ms));


	onMount(async () => {
	})

</script>

<div class="flex row">
	<div class="grow flex column-stretch-start no-basis">
		<Title>Subscribe</Title>
		<p class="ptb1"></p>
		<ListSignup {...config} />
	</div>
	<div class="w4em" />
	<div class="grow flex column-start-start  no-basis cmb1">
		<Title>RSS</Title>
		<p>If it ain't broke, why fix it? RSS feeds . Some recommended RSS readers are: </p>
		<a class="button text-center" href="/rss.xml">RSS</a>
	</div>
</div>