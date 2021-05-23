<script>
	import { autoplay, audio, centroid } from '$lib/universal/stores.js'
	import Timestamp from '$lib/universal/Timestamp.svelte'
	import PostControls from '$lib/PostControls.svelte'
	import utils from '$lib/universal/utils.js'
	import { All } from '$lib/rad-and-cool-icons/lib'
	import { dev } from '$app/env'
	import { eze } from '$lib/universal/stores.js'
	
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

	$: href = `/feed/${utils.year(created)}/${id}`

	export let format = 'DD-MM-YYYY' // 'D MMM, YYYY, dd'

</script>

<div class="post-text flex row-space-between-start">
	<div class="grow flex column-center-start">
		<a class="unclickable flex column-center-center activ8" {href}>
			<span class="p0-5 uppercase plr2 filled f1 text-center">{text}</span>
			<Timestamp class="mt1  flex" date={date} {format}></Timestamp>
		</a>
		<PostControls {...$$props} />
	</div>
</div>


{#if dev}
	<a class="button mtb1 " href={`${$eze.editor}items/posts/${id}`}>EZE</a>
{/if}