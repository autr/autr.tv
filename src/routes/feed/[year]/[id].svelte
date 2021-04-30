<script context="module">
	import api from '$lib/api.js'
	export const load = api.get( params => `http://localhost:3000/api/autr/items/posts/${params.id}?depth=2` )
</script>
<script>
	import LayoutTwoCol from '$lib/universal/LayoutTwoCol.svelte'
	import Media from '$lib/universal/Media.svelte'
	import PostText from '$lib/PostText.svelte'
	export let data

	$: files = data?.files || []
</script>

<div class="fixed t0 l0 w100vw h100vh bg z-index99">
	<LayoutTwoCol flip={true}>
		<div slot="left">

			{#each files as file, idx}
				<div 
					class="flex grow" >
					<a 
						class="b1-solid flex grow w100pc"
						href={file.id}>
						<!-- {console.log(file, '+++++!')} -->
						<Media 
							{file} 
							paused={false}
							autoplay={true}
							muted={true} 
							active={true} />
					</a>
				</div>
			{/each}
		</div>
		<div slot="right">
			<a>Back</a>
			<PostText {...data}  />
		</div>
	</LayoutTwoCol>
</div>