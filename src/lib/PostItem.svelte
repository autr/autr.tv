<script>

	import { scroll, centroid } from '$lib/universal/store.js'
	import utilities from '$lib/universal/utilities.js'
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/env'
	import Media from '$lib/universal/Media.svelte'
	import PostText from '$lib/PostText.svelte'

	export let id
	export let title    
	export let text
	export let files
	export let created
	export let updated
	export let original = ''
	export let index 


	export let hidden // based on scroll
	export let focus // based on scroll

	$: href = `/feed/${utilities.year(created)}/${id}`
	$: odd = true //index%2 == 0
	$: files_ = files || [] 

</script>

<div 
	{id} 
	{title} 
	class:row={ !odd }
	class:row-reverse={ odd}
	class="flex grow wrap mb10">
	{#each files_ as file, idx}
		<div 
			class="flex grow" 
			class:maxw70pc={ files_.length <= 2 }
			class:maxw50pc={ files_.length > 2 } >
			<a 
				class="flex grow w100pc" 
				{href} 
				id={id + '-media'}>
				<Media 
					{file} 
					root="/posts/"
					paused={!focus} 
					active={!hidden} />
			</a>
		</div>
	{/each}
	<div class="flex w30pc column">
		{files_.length}
		<PostText {id} {title} {text} {created} {updated} {original} {index} />
	</div>
</div>
