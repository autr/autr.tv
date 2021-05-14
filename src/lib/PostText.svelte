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
<div class="p4 cmb1 flex column-flex-start-flex-start">
	<a class="unclickable bb2-solid bt2-solid ptb0-2 flex" {href}>
		<Timestamp class="uppercase f0 bold" date={created} format="D MMM YYYY" />
	</a>
	<div class="f1" >
		{text}
		{original}
	</div>
</div>