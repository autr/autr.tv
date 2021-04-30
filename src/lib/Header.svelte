<script>
	import Media from '$lib/universal/Media.svelte'

	export let title
	export let subtitle
	export let icon
	export let id
	export let created
	export let updated
	export let orientation = 'column'
	
	const menu = {
		'Feed': '/feed',
		'Projects': '/projects',
		'Code': '/code',
		// 'Downloads': '/downloads',
		'Shop': '/shop',
		'Hello': 'hello'
		// 'Links': '/links',
	}

</script>

<h1>
	<a sveltekit:prefetch href="/" class="unclickable rel">
		<span class="f1 abs hidden">{title}</span>
		<span 
			class="maxw4em block"
			style="filter:invert(1);mix-blend-mode:screen;">
			<!-- <Media file={icon[0]} /> -->
		</span>
	</a>
</h1> 
<div>{subtitle}</div>
<div class="flex {orientation} ptb1">
	{#each Object.entries( menu ) as [text, url]}
		<div>
			<a 
				sveltekit:prefetch href={url} 
				class="ptb0-2 block bold">
				{text}
			</a>
		</div>
	{/each}
</div>
<div>
	<input type="text" placeholder="Mailing list" />
</div>