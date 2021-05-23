<script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {
		const { year, id } = page.params


		let data = await api.get( { post: `/posts~${id}.json`, posts: `/posts.json` }, fetch )

		const idx = data.posts.indexOf( data.posts.sort( (a,b) => {
			return b.date - a.date 
		}).find( item => item.id == data.post.id ) )


		let prev = idx == 0 ? data.posts.length - 1 : idx - 1
		let next = idx >= data.posts.length - 1 ? 0 : idx + 1
		let random = Math.round( Math.random() * (data.posts.length - 1) )

		console.log('A', {prev,next,random})
		prev = { ...data.posts[prev], hyperlink: 'prev' }
		next = { ...data.posts[next], hyperlink: 'next' }
		random = { ...data.posts[random], hyperlink: 'random' }
		console.log('B', {prev,next,random})

		data = { post: data.post, prev, next, random }

		return { props: { data } }
	}
</script>
<script>
	import { page } from '$app/stores'
	import PostItem from '$lib/PostItem.svelte'
	import PostMedia from '$lib/PostMedia.svelte'
	import PostText from '$lib/PostText.svelte'
	import utils from '$lib/universal/utils.js'
	import PostControls from '$lib/PostControls.svelte'
	import Close from '$lib/Close.svelte'
	import Timestamp from '$lib/universal/Timestamp.svelte'
	import { All } from '$lib/rad-and-cool-icons/lib'
	import Header from '$lib/Header.svelte'
	export let data

	const size = 20
	$: icons = {
		width: size,
		height: size,
		stroke: 1,
		color: 'var(--color)'
	}

	let random = 'fdssd'

	$: post = data.post
	$: links = [ data.prev, data.random, data.next ]

	$: button = 'b1-solid flex row-center-center p1 grow'

</script>

<svelte:head>
	<title>Autr | Feed {$page?.params?.year || ''} | {post.text}</title>
</svelte:head>

<div id="feed-item" class="mt1 flex column-center-start sm-container">
	<div class="feed-item-media">
		<PostMedia {...post} autohide={false} />
	</div>
	<PostText {...post} />
	<nav id="feed-nav" class="mtb1 flex row-center-center sm-max-100">
		<div class="flex row rel cptb0-5 sm-max-100">

			{#each links as link,i}
				{#if i != 0}
					<span class="w1em" />
					<!-- <span class="h1em sm-min-none" /> -->
				{/if}
				<a 
					class="button plr1 grow" 
					href={`/feed/${utils.year(link.date)}/${link.id}`}>
					{link.hyperlink}
				</a>
			{/each}
		</div>
	</nav>
</div>