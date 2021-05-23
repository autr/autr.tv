<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				error
			}
		};
	}
</script>

<script>
    import LayoutCentered from '$lib/universal/LayoutCentered.svelte'
    import Title from '$lib/Title.svelte'
    import TBA from '$lib/TBA.svelte'

    export let error

    try { 
    	console.error( Object.values(error).join('\n[error] -> ') ) 
    } catch (e) {
    	console.error( error )
    }
</script>

<LayoutCentered>
	<div class="cmb1 " style="width: var(--media-sm)">
		<Title>{error?.name || '404'}</Title>
		<div class="errors">{error?.message || 'Page not found.'}</div>
		<div class="filled p2 overflow-auto mb2">
			<code class="monospace">
				{error?.stack || 'No stack to view.'}
			</code>
		</div>
	    <a class="button flex row-center-center" href={`../`}>return</a>
	</div>
</LayoutCentered>