<script>

	import { browser, dev } from '$app/env'
	import { base, assets } from '$app/paths';

	import utils from '$lib/universal/utils.js'
	import Media from '$lib/universal/Media.svelte'

	export let id
	export let text
	export let media
	export let created
	export let updated
	export let original = ''
	export let index = -1
	export let embed
	export let date 
	export let status
	export let autohide = false
	export let format
	export let orientation



	$: href = `/feed/${utils.year(date)}/${id}`

	$: media_ = media || [] 

	$: common = { 
		class: "post-media-link flex grow w100pc feed-media-item mb1 rel"
	}

	$: em = (embed || [])[0]

	$: iframe = {
		mime: (embed || [])[0]?.iframe,
		url: (embed || [])[0]?.iframe,
		id: (embed || [])[0]?.id
	}

	function onClick( e, mime ) {
		// if (!link != -1 ) e.preventDefault()
	}

	$: root = `/posts/${utils.year(date)}/`


</script>
{#if embed}
	<div 
		on:click={ onClick }
		{...common} 
		id={`${id}-media-embed`}>
		<Media 
			{root}
			{format}
			file={iframe}
			bind:orientation={orientation}
			autohide={ autohide ? `${id}-media-embed` : null}/>
	</div>
	<!-- <div class="space h4em" /> -->
{/if}
{#each media_ as file, idx} 
	<div
		on:click={ onClick }
		{...common}
		id={`${id}-media-${idx}`}>
		<a {href} class="fill unclickable activ8 z-index22"></a>
		<Media 
			{root}
			{format}
			{file} 
			bind:orientation={orientation}
			autohide={ autohide ? `${id}-media-${idx}` : null} />
	</div>
{/each}
