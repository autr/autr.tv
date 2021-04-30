<script>
	import Timestamp from '$lib/universal/Timestamp.svelte'
	import utilities from '$lib/universal/utilities.js'
	
	export let id
	export let title
	export let text
	export let files
	export let created
	export let updated
	export let original = ''
	export let index 

	$: href = `/feed/${utilities.year(created)}/${id}`
</script>
<div class="p1 flex column">
	<a class="unclickable" {href}>
		<Timestamp date={created} />
	</a>
	{title}
	{text}
	{original}
</div>