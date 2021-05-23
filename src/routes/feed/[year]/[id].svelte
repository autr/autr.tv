<script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {
		const { year, id } = page.params


		const data = await api.get( { post: `/posts~${id}.json` }, fetch )

		// console.log(data.post)
		// const idx = data.posts.find( item => item.id == data.post.id )

		// console.log(idx)

	// function filter( year ) {
	// 	console.log('[feed] filtering into years')
	// 	posts = utils.posts( data.posts, $page.params.year )
	// 	const idx = parseInt( Math.random() * (posts.data.length - 1) )
	// 	const item = posts.data[ idx ]
	// 	random = `/feed/${utils.year(item?.date)}/${item?.id}`
	// }

		return { props: { data } }
	}
</script>
<script>
	import { page } from '$app/stores'
	import PostItem from '$lib/PostItem.svelte'
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

	$: button = 'b1-solid flex row-center-center p1 grow'

</script>

<svelte:head>
	<title>Autr | Feed {$page?.params?.year || ''} | {post.text}</title>
</svelte:head>

<!-- <nav id="feed-nav" class="flex  ptb0-5 row-stretch-center  bb  wrap">
	<div class="flex row wrap rel grow w100pc">
		<div class="align-self-flex-end grow flex row-flex-end-center">
			<a href={random} class="unclickable ptb0-5">random</a>
		</div>
	</div>
</nav> -->
<article class="ptb1 flex column-center-start">
	<PostItem {...post} link={false}>

	</PostItem>
	
</article>


			<!-- <span class="rel">
				<All type="randomise" {...icons} />
				<All type="randomise" {...icons} class="flipy fill" />
			</span> -->