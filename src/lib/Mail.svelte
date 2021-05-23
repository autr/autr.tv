<script>

	import { browser } from '$app/env'
	import { onMount } from 'svelte'

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }


	let ping = '#nospam'
	let obfus = 'nospam'

	function switcheroo(e) {
		ping = 'mailto:ping@autr.tv'
	}
	onMount( async e => {
		if (browser) obfus = 'ping@autr.tv'
	})

</script>


<a 
	on:mouseover={ switcheroo }
	on:touchstart={ switcheroo }
	on:click={ switcheroo }
	href={ping}
	style={style_}
	class={class_}>
	{obfus}
</a>