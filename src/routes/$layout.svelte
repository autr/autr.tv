<script context="module">
	import { amp, browser, dev, prerendering } from '$app/env'
	import api from '$lib/api.js'
	export const load = api.get( params => 'http://localhost:3000/api/autr/items/info?depth=1', 0 )
</script>

<script>

	import Header from '$lib/Header.svelte'
	import LayoutTwoCol from '$lib/universal/LayoutTwoCol.svelte'
	export let data

</script>

<main>
	<LayoutTwoCol>
		<div slot="left">
			<Header {...data} />
		</div>
		<div slot="right">
			<slot />
		</div>
	</LayoutTwoCol>
</main>