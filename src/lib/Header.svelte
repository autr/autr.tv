<script>

	import { info } from '$lib/universal/stores.js'
	import { burger } from '$lib/universal/stores.js'
	import { dark } from '$lib/rad-and-cool-icons/lib/stores.js'
	import { page } from '$app/stores'
	import Media from '$lib/universal/Media.svelte'
	import Close from '$lib/Close.svelte'
	import Logo from '$lib/Logo.svelte'
	import { All } from '$lib/rad-and-cool-icons/lib'
	import { goto } from '$app/navigation'


	export let overlay = false
	
	const menu = {
		'Feed': '/feed',
		'Works': '/works',
		// 'About': '/about',
		// 'Code': '/code',
		// 'Downloads': '/downloads',
		// 'Shop': '/shop',
		// 'Hello': 'hello'
		// 'Links': '/links',
	}

	const submenu = {
		'About': '/about',

	}

	const size = 45

	let lightdark = {
		width: size,
		height: size,
		duration: 200,
		stroke: 1
	}

	$: widthheight = `width:${size}px;height:${size}px;`

	function onClick() {
		$burger = false
	}

	$: button = {
		type: 'burger',
		color: 'var(--color)',
		stroke: 1,
		width: size,
		height: size,
		duration: 200
	}

	$: title = $page.path.substring(1).split('/')[0]

	const mobile_cols = "flex no-basis grow "

	function go(e) {
	}

	$: rotate = `transform-origin: 50% 50%; transform: rotate(90deg);`

</script>

<!------------------------ MOBILE ------------------------>


<div 
	id="mobile-header" 
	class="w100pc t0 l0 md-min-none h5-2em z-index88"
	class:abs={$burger}>
	<div 
		class="w100vw plr1 pt1 grow">
		<div 
			class:bb={!$burger}
			class="flex row-space-between-center pb1">
			<a 
				class={mobile_cols + 'activ8 row-start-center unclickable'}
				href="/">
				<div class="overflow-hidden" style="height:52px">
					<Logo size={'102px'} />
				</div>
				<!-- <h2 class="f1 maxw4em">Gilbert S</h2> -->
			</a>
			<div class={mobile_cols + 'row-flex-end-center grow cml1'}>
				<All
					class="activ8 pointer"
					type="light-dark"
					id="mobile"
					color={ 'var(--color)'}
					{...lightdark} />
				<span 
					class="b1-solid"
					style={widthheight + ' margin-top:1px'} />
			</div>
		</div>
	</div>
</div>

<Close 
	class="activ8 fixed md-min-none r1 t1-3 z-index99 b1-solid normal" 
	bind:state={$burger} 
	style={widthheight + 'margin-top:-1px'} 
	invert={true}
	on:click={e => $burger = !$burger} />

<nav 
	class="bg fill fixed flex column-stretch-stretch pt5-4 plr1 pb1 z-index77 rel"
	id="mobile-nav" 
	class:none={!$burger}
	style="top:-1px">

	<div class="grow flex column-stretch-stretch">

		{#each Object.entries( { 'Top' : '#top', ...menu, 'About': '/about' } ) as [text, url]}
			<a 
				class="mobile-menu-link activ8 b1-solid grow flex row-center-center f2 lowercase"
				on:click={onClick}
				href={url}
				style="margin-top:-1px">
				{#if url == '#top'}

					<All
						style={rotate}
						type="arrow"
						color={ 'var(--color)'}
						misc={{rotate: 1}}
						stroke={1}
						width={size * 0.8}
						height={size * 0.8} />
				{:else}
					{text}
				{/if}
			</a>
		{/each}
	</div>
</nav>



<!------------------------ DESKTOP ------------------------>


<header 
	id="header-desktop"
	class="flex grow bb bg ptb1 mlr1 row-space-between-center">
	<a 
		on:click={onClick}
		href="/" 
		class="activ8 unclickable flex wrap md-max-none row-start-center">
		<div class="overflow-hidden" style="height:62px">
			<Logo />
		</div>
		<h2 class="f1">{$info.subtitle}</h2>
	</a>

	{#if !overlay}

		<div 
			class="flex wrap md-max-none row-start-center cml1">

			<!-- menu links -->

			{#each Object.entries( menu ) as [text, url]}
				<a 
					class="activ8 header-menu-link ptb0-2 block unclickable"
					on:click={onClick}
					href={url}
					class:bb={ $page.path == url }>
					{text}
				</a>
			{/each}
			<a on:click={onClick} class="button text-center md-max-none" href={`/about`}>about</a>
			<All
				type="light-dark"
				id="desktop"
				class="pointer activ8"
				color={ 'var(--color)'}
				{...lightdark} />
		</div>

	{:else}
		<a href={'./'} class="flex row-center-center unclickable activ8">
			Back
			<Close 
				class="ml1"
				style={widthheight} 
				state={true} /> 
		</a>
	{/if}
</header>