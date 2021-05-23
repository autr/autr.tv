<script>

	import PostMedia from '$lib/PostMedia.svelte'
	import PostText from '$lib/PostText.svelte'

	export let id 
	export let text
	export let media
	export let created
	export let updated
	export let original = ''
	export let index 
	export let embed
	export let date
	export let status


	let orientation = false
	


	
</script>

<div 
	{id}
	class="post-item flex column-center-center grow wrap post-orientation-{orientation}">
	<div class="flex row-stretch-stretch">
		<div class="post-media flex column grow no-basis">
			<PostMedia 
				bind:orientation={orientation}
				{...$$props} 
				autohide={true}  />
		</div>
	</div>
	<PostText {...$$props} />

	<slot />

	<div class="space h2em" />
</div>