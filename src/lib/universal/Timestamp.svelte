<script>
	import dayjs from 'dayjs'
	// import * as relativeTime from 'dayjs/plugin/relativeTime'

	export let relative = false
	export let format = 'DD-MM-YYYY-HH:mm'
	export let date
	// dayjs.extend( relativeTime )

</script>

{#if relative}
	<!-- { dayjs( date  * 1000 ).fromNow(true) } -->
{:else}
	{ dayjs( date  * 1000 ).format('YYYY-MM-DD') }
{/if}

