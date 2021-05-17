<script>

	import { dark } from '$lib/rad-and-cool-icons/lib/stores.js'
	import { page } from '$app/stores'
	import Media from '$lib/universal/Media.svelte'
	import { RadCoolLightDarkIcon } from '$lib/rad-and-cool-icons/lib'

	export let title
	export let subtitle
	export let icon
	export let id
	export let created
	export let updated
	export let orientation = 'column'
	
	const menu = {
		'Feed': '/feed',
		'Works': '/works',
		'About': '/about',
		// 'Code': '/code',
		// 'Downloads': '/downloads',
		// 'Shop': '/shop',
		// 'Hello': 'hello'
		// 'Links': '/links',
	}

	const submenu = {
		'About': '/about',

	}

	let lightdark = {
		width: 40,
		height: 40,
		duration: 400,
		stroke: 1
	}

</script>

<div 
	class:cmr2={orientation == 'row'}
	class="flex {orientation}-center-center wrap">
	<div class="ptb1">
		<h1>
			<a 
				sveltekit:prefetch href="/" class="rel unclickable">
				<span class="f1 abs hidden">{title}</span>
				<span 
					class:dark={$dark}
					class:light={!$dark}
					class="logo minw120px maxw140px block">
					<Media file={ {...icon[0], title: 'autr.tv' }}  />
				</span>
			</a>
		</h1> 
	</div>
	<div class="f0 bold italic maxw4em">{subtitle}</div>
</div>



<div 
	class:cml2={orientation == 'row'}
	class="flex {orientation}-center-center ptb1 wrap">
	{#each Object.entries( menu ) as [text, url]}
		<div>
			<a 

				class:bb2-solid={ $page.path == url }
				sveltekit:prefetch href={url} 
				class="ptb0-2 block bold">
				{text}
			</a>
		</div>
	{/each}
	<a class="button text-center" href={`/subscribe`}>subscribe</a>
	<RadCoolLightDarkIcon 
		class="pointer"
		color={ 'var(--color)'}
		{...lightdark} />
</div>