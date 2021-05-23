<script>
	import { autoplay, audio, centroid } from '$lib/universal/stores.js'
	import Timestamp from '$lib/universal/Timestamp.svelte'
	import utils from '$lib/universal/utils.js'
	import { All } from '$lib/rad-and-cool-icons/lib'
	
	export let id
	export let text
	export let media
	export let created
	export let updated
	export let original = ''
	export let index = -1
	export let embed 
	export let date 
	export let status

	$: href = `/feed/${utils.year(created)}/${id}`

	export let format = 'DD-MM-YYYY' // 'D MMM, YYYY, dd'

	$: video = media.find( m => m.mime.indexOf('video') != -1) ? true : false

	$: icons = {
		width: 35,
		height: 35,
		stroke: 1,
		color: 'var(--color)'
	}

	$: playing = $centroid?.id && id ? $centroid.id.indexOf(id) != -1 : false
</script>

<div class="post-text flex row-space-between-start">
	<div class="grow flex column-center-start">
		<a class="unclickable flex column-center-center activ8" {href}>
			<span class="p0-5 uppercase plr2 filled f1 text-center">{text}</span>
			<Timestamp class="mt1  flex" date={date} {format}></Timestamp>
		</a>
		<nav class="m1 flex row-center-center sm-max-none">
			{#if video}
				<span on:click={e => $autoplay = !$autoplay}>
					<All 
						type="play-pause"
						state={ $autoplay }
						{...icons}
						width={icons.width - 12}
						height={icons.height - 12}
						 />
				</span>
				<span class="w1em" />
				<span on:click={e => $audio = !$audio}>
					<All 
						state={ $audio  }
						type="audio"
						{...icons} />
				</span>
			{/if}
		</nav>
	</div>
</div>