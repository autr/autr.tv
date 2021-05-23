<script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {

		let data = (await api.get( { posts: '/posts.json', about: '/about.json' }, fetch ))
		let posts = data.posts.sort( (a,b) => b.date - a.date).splice(0,6)
		return { props: { posts, about: data.about } }
	}
</script>

<script>
	import utils from '$lib/universal/utils.js'
	import { info } from '$lib/universal/stores.js'
	import Title from '$lib/Title.svelte'
	import Media from '$lib/universal/Media.svelte'
	import Timestamp from '$lib/universal/Timestamp.svelte'

	export let posts
	export let about

	$: col = 'grow flex no-basis'
	$: button = 'button flex row-center-center sm-max-100 filled'
	$: spacer = 'sm-max-none flex w1em h1em'

	$:format = utils.device() != 'desktop' ? '576x620x95' : ''
</script>

<svelte:head>
	<title>Autr | Artist & Creative Engineer</title>
</svelte:head>


<div id="homepage" class="flex column pt1">
	<a href="/feed" class="homepage-media {col}">
		<Media file={$info.cover[0]} {format} root="/pages/" copy={true} />
	</a>
	<!-- <a href="/about" class="{button}">about</a> -->
<!-- 	<div class="{col} column">

		<div class="row flex mtb1 wrap">
			<span class="{spacer}" />
			<a href="/work" class="{button}">work</a>
			<span class="{spacer}" />
		</div>

	</div> -->
<!-- 
	<a href="/feed" class="homepage-media {col} minw70pc mb1">
		<Media file={posts[0].media[0] || posts[0].embed} />
	</a>
	<a href="/about" class="{button}">about</a>
	<div class="about-media">
		<Media file={about[0].cover[0]} format="996x600x95xfit"  />
	</div> -->
</div>
