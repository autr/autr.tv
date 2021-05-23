<script context="module">
	import api from '$lib/api.js'
	export const load = async ({ fetch, page }) => {
		return { props: { data: await api.get( { about: '/about.json' }, fetch ) } }
	}
</script>

<script>

	import utils from '$lib/universal/utils.js'
	import LayoutCentered from '$lib/universal/LayoutCentered.svelte'
	import { dark } from '$lib/rad-and-cool-icons/lib/stores.js'
	import Color from 'color'
	import Title from '$lib/Title.svelte'
	import Mail from '$lib/Mail.svelte'
	import Media from '$lib/universal/Media.svelte'
	export let data

	$: mobile = utils.device() != 'desktop'

	$: about = data.about[0]

	$: sets = {
		bad: {
			links: about['bad-links']
		},
		neutral: {
			links: about['neutral-links']
		},
		good: {
			links: about['good-links']
		}
	}
	const letters=['a','b','c','d','e','f']

	function colourise( c ) {
		let col = Color( c )
		// if (!$dark) col = col.darken(0.5)
		// if (!$dark) return `background-color:${col}`
		return `border-color:${col}`
	}

	$:format = utils.device() != 'desktop' ? '576x576x95' : '996x420x95xfit'

	const block  = "flex column-start-start wrap basis0pc grow cmb1 mb0 sm-max-100"
</script>

<svelte:head>
	<title>Autr | Gilbert Sinnott | Artist</title>
</svelte:head>
<div class="pt1 wrap">

	<div class="flex row wrap">
		<article class="{block} ">
			<Title>Bio</Title>
			<pre class="whitespace-prewrap">
				{@html about.bio}
			</pre>
		</article>
		<div class="w10em sm-max-none" />
		<nav class="{block}">
			<Title>Contact</Title>
			<p>I'm trying to communicate more outside of social media - emails always welcome! Mailing list for updates (as they come).</p>
			<p>Textfiles always preferred instead of social-media! Ping me an email or subscribe to the mailing list for updates. </p>
			<a href="/subscribe" class="button text-center sm-max-100">subscribe to mailing list</a>
			<Mail class="button text-center filled text-center sm-max-100" />
		</nav>
	</div>
	<div class="h1em sm-max-none" />
	<div class="flex row wrap">
		<div class="{block}">
			<Title>Elsewhere</Title>
			<div>
				{#each Object.entries( sets ) as [ type, about ] }
					<div class="flex column">
						{#each about?.links || [] as link,i}
							<a 
								target="_blank"
								class=" unclickable"
								href={link.item.href} 
								title={link.id}>
								<span 
									class="dot" />
								<span class="bb">
									{link.item.text.trim()}
								</span>
							</a>
						{/each}
					</div>
				{/each}
			</div>
		</div>
		<div class="w10em sm-max-none" />
		<div class="{block}">
			<Title>Work Address</Title>
			<p>Gilbert Sinnott<br />Lacuna Lab (H.H, V.H)<br />Paul-Lincke Ufer 44A<br />Berlin 10999
		</div>
	</div>
	<div class="h1em sm-max-none" />
	<div class="about-media">
		<Media file={about.cover[1]} {format} root="/pages/" class="" />
	</div>

	Y'olde RSS feed is available. Some decent RSS readers are NetNewsWire and maybe the latest Chrome (Canary)


</div>