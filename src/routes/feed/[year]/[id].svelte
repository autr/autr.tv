<script context="module">
	export const load = async ({ fetch, page }) => {
		const res = await fetch( `/feed.json`  )
		const id = page.path.substring( page.path.lastIndexOf('/') + 1 )
		let data = (await res.json()).find( item => (item.id == id) )
		if (res.ok) return { props: { data } }
		const { message } = await res.json()
		return { error: new Error(message) }
	}
</script>
<script>
	import LayoutTopBar from '$lib/universal/LayoutTopBar.svelte'
	import PostText from '$lib/PostText.svelte'
	import PostMedia from '$lib/PostMedia.svelte'
	export let data

	$: files = data?.files || []

	const sides = `sticky t0px l0px sticky no-basis ptb1 flex column-center-space-between`
</script>

<div class="fixed t0 l0 w100vw h100vh bg z-index99">
	<LayoutTopBar width={92}>
		<div slot="body" class="flex row-center-center row grow">
			<div class="grow flex">
				<div class={sides + ' minw22em'}>
					<PostText {...data}  />
					<a href={data.prev} class="mb4">PREVIOUS</a>
				</div>
				<div class="grow p1">
					<PostMedia {...data} root="/posts/" />
				</div>
				<div class={sides}>
					<a href="/feed" class="button text-center cross w3em h3em p0"></a>
					<a href={data.next} class="mb4">NEXT</a>
				</div>
			</div>
		</div>
	</LayoutTopBar>
</div>