<script>
	import Autr from '$lib/Autr.js'

	import { info } from '$lib/universal/stores.js'
	import { dark } from '$lib/rad-and-cool-icons/lib/stores.js'

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

	export let size = '120px'

</script>
<h1 id="autr" class="flex row-center-center">
	<span 
		class:dark={$dark}
		class:light={!$dark}
		style={`min-width:${size};max-width:${size};${style_}`}
		class="logo block {class_}">
		{@html Autr}
	</span>
</h1>