<script>
	import dayjs from 'dayjs'
	// import * as relativeTime from 'dayjs/plugin/relativeTime'

	export let relative = false
	export let format = 'D MMM, YYYY, dd'
	export let date
	// dayjs.extend( relativeTime )

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

</script>

<timestamp class={class_} style={style_}>
	{#if relative}
		<!-- { dayjs( date  * 1000 ).fromNow(true) } -->
	{:else}
		{ dayjs( date  * 1000 ).format(format) }
	{/if}
</timestamp>