

<script>
	import Title from '$lib/Title.svelte'
	import { pkg } from '$lib/universal/stores.js'
	import dayjs from 'dayjs'

	const viz = {
		'build version': $pkg.version,
		'build date': dayjs( new Date() ).format('D MMM, YYYY, dd'),
		'node version': $pkg?.engines?.node
	}
</script>


<div class="flex grow column-center-center mtb1 cmb1">
	{#each Object.entries(viz) as [name, value] }
		<div class="flex row-center-center">
			<p class="mr1">{name}</p>
			<p>{@html value}</p>
		</div>
	{/each}
</div>