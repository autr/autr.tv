<script>
	export let state = false
	export let invert = false

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

</script>

<button 
	class="{class_} p0-2 flex row-stretch-stretch unclickable {invert ? 'filled' : ''}"
	style={style_}
	on:click>
	<div 
		class:cross={state}
		class="plr0-4 ptb0-5 flex grow column-stretch-space-between {invert ? 'inverted' : ''}">
		{#each new Array(4) as n, i}
			<span 
				class:none={state}
				class="bt1-solid h1px" 
				style="border-color: {invert ? 'var(--bg)' : ''}" />
		{/each}
	</div>
</button>