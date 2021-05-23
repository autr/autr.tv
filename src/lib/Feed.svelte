<script>
	import { page } from '$app/stores'
	import { onMount, onDestroy } from 'svelte'
	import { All } from '$lib/rad-and-cool-icons/lib'
	import utils from '$lib/universal/utils.js'

	import ListView from '$lib/universal/ListView.svelte'
	import ListSignup from '$lib/ListSignup.svelte'
	import PostItem from '$lib/PostItem.svelte'
	import { goto } from '$app/navigation';


	export let data

	const keys = ['id', 'created', 'updated', 'media', 'text', 'original', 'embed', 'date', 'status']

	let posts = []

	function filter( year ) {
		posts = utils.posts( data.posts, $page.params.year )
		posts.data = posts.data.filter( post => {
			return post.status == 'published'
		})
		const idx = parseInt( Math.random() * (posts.data.length - 1) )
		const item = posts.data[ idx ]
		random = `/feed/${utils.year(item?.date)}/${item?.id}`
	}

	$: filter( $page.params.year )



	let random

	const href = year => `/feed/${year == 'all' ? '' : year}`


	let current = null
	let checked = {}
	function setChecked( years_, year_, current_ ) {
		if (year_ == '') year_ = 'all'
		for (let i = 0; i < years_.length; i++) {
			const y = years_[i]
			const url = year_ == y
			checked[y] = current == y || ( url && current == null )
		}
	}

	$: setChecked( posts.years, $page?.params?.year || '', current )


	$: rando ={
		duration: 200,
		stroke: 1,
		width: 20,
		height: 20,
		color: 'var(--color)',
		type: 'randomise'
	}

	$: svg = {
		'stroke-width': 1,
		stroke: 'var(--color)',
		'vector-effect': 'non-scaling-stroke',
		fill: 'transparent'
	}

	function onClick( e, year ) {
		current = year
		try { goto( '/feed/' + year ) } catch(err) {}

	}

</script>


<svelte:head>
	<title>Autr | Feed | {$page?.params?.year || `Latest work, photos, videos`}</title>
</svelte:head>

<nav id="feed-nav" class="flex  ptb0-5 row-stretch-center  bb  wrap">
	<div class="flex row wrap rel grow w100pc">
		{#each posts.years as year}
			<label class="radio mtb0-5 activ8">
				<a 
					class="unclickable flex row-center-center"
					on:click={ e => onClick( e, year ) }
					href={ href( year ) }>
						<input 
							type="checkbox" 
							checked={ checked[year] } />
						<span />
						{year}
				</a>
			</label>
		{/each}
		<div class="align-self-flex-end grow flex row-flex-end-center">
			<a href={random} class="unclickable ptb0-5">random</a>
		</div>
		<a href={random} class="block h2em w4em unclickable align-self-center flex row-start-center abs r0 b0-3 none" >
			<span class="p0-3"></span>
			<svg width="100%" height="100%" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" >
			    <path {...svg} d="M85.41,0L100,15.494L85.092,31.325" />
			    <path {...svg} d="M84.282,66.253L100,82.945L83.939,100" />
			    <path {...svg} d="M0.395,68.675C2.851,61.718 6.12,55.183 10.079,49.198C5.927,42.989 2.521,36.179 -0,28.916"/>
			    <path {...svg} d="M100,82.538C92.722,84.784 85.027,85.989 77.07,85.989C49.431,85.989 24.964,71.456 10.079,49.198C24.938,26.739 49.52,12.048 77.309,12.048C85.179,12.048 92.792,13.227 100,15.426" />
			</svg>

		</a>
	</div>
</nav>
<slot />
<ListView
	id="feed"
	class="feed mt1"
	data={ posts.data }
	{keys}
	component={PostItem}>
	<button 
		slot="more" 
		class="filled">more</button>
	<a href="#top" slot="top" class="button flex row-center-center">
		<All
			type="arrow"
			style="transform-origin: 50% 50%; transform: rotate(90deg);"
			color={ 'var(--color)'}
			misc={{rotate: 1}}
			stroke={1}
			width={45 * 0.8}
			height={45 * 0.8} />
	</a>
	<div slot="finished">
		<ListSignup />
	</div>
</ListView>