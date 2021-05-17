<script>

	import PostMedia from '$lib/PostMedia.svelte'
	import PostText from '$lib/PostText.svelte'
	import { dev } from '$app/env'

	export let id 
	export let text
	export let files
	export let created
	export let updated
	export let original = ''
	export let index 
	export let embed
	export let date
	export let status

	let ratio = 100
	
	$: root = dev ? 'http://localhost:3000/api/autr/files/posts/' : '/posts/'
	$: fullwidth = ratio < 75

	const format = '962x0x80xfit'

</script>

<div 
	{id}
	class="flex grow wrap">
	<div class="flex grow maxw22em column pr8 pb2 ">
		<PostText {...$$props} />
	</div>
	<div 
		class:minw100pc={fullwidth}
		class="flex column grow no-basis">
		<PostMedia 
			{...$$props} 
			{root}
			bind:ratio={ratio} 
			autohide={true} 
			{format} />
	</div>
</div>
