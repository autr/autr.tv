<script>
	import Timestamp from '$lib/universal/Timestamp.svelte'
	import utilities from '$lib/universal/utilities.js'
	
	export let id
	export let text
	export let files
	export let created
	export let updated
	export let original = ''
	export let index = -1
	export let embed 
	export let date 
	export let status

	$: href = `/feed/${utilities.year(created)}/${id}`

	export let format = 'D MMM, YYYY, dd'
</script>
<div class="cmb1 flex column-start-start">
	<a class="unclickable bb1-solid text-center bt1-solid ptb0-6 flex" {href}>
		<Timestamp class="bold f0 text-center w100pc uppercase" date={date} {format} />
	</a>
	<div class="f1" >
		{text}
	</div>
</div>