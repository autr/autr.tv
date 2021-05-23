<script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {
		return { props: { data: await api.get( { posts: '/posts.json' }, fetch ) } }
	}
</script>

<script>
	import Feed from '$lib/Feed.svelte'
	export let data
</script>
<Feed {data} />

<!-- <script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {

		let data = (await api.get( { posts: '/posts.json', about: '/about.json' }, fetch ))
		let posts = data.posts.sort( (a,b) => b.date - a.date).splice(0,6)
		return { props: { posts, about: data.about } }
	}
</script>

<script>
	import { goto } from '$app/navigation'
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

	goto('/feed')


</script>

<svelte:head>
	<title>Autr | Artist & Creative Engineer</title>
</svelte:head>


<div id="homepage" class="flex column pt1">
	<a href="/feed" class="homepage-media {col}">
		<Media file={$info.cover[0]} {format} root="/pages/" copy={true} />
	</a>
	<div class="cmb1 mt1">
		<a href="/feed" class="{button}">feed</a>
		<a href="/about" class="{button}">about</a>
	</div>
</div>
 -->