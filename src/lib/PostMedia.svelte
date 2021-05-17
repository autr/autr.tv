<script>

	import utilities from '$lib/universal/utilities.js'
	import Media from '$lib/universal/Media.svelte'

	export let id
	export let text
	export let files
	export let created
	export let updated
	export let original = ''
	export let index = -1
	export let embed
	export let ratio = 100
	export let date 
	export let status
	export let autohide = false
	export let format
	export let root = null



	$: href = `/feed/${utilities.year(created)}/${id}`

	$: files_ = files || [] 

	$: link = {
		class: "flex grow w100pc",
		href
	}

	$: em = (embed || [])[0]

	$: iframe = {
		mime: (embed || [])[0]?.iframe,
		url: (embed || [])[0]?.iframe,
		id: (embed || [])[0]?.id
	}

</script>
{#if embed}
	<a {...link} id={`${id}-media-embed`}>
		<Media 
			{format}
			file={iframe}
			autohide={ autohide ? `${id}-media-embed` : null}
			bind:ratio={ratio} />
	</a>
	<div class="space h4em" />
{/if}
{#each files_ as file, idx}
	<a {...link} id={`${id}-media-${idx}`}>
		<Media 
			{format}
			{file} 
			{root}
			autohide={ autohide ? `${id}-media-${idx}` : null}
			bind:ratio={ratio} />
	</a>
	<div class="space h4em" />
{/each}