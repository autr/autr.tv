<script>
    import Title from '$lib/Title.svelte'
    import TBA from '$lib/TBA.svelte'

    export let error
    export let data

    console.error(error,data, $$props)
</script>

<div class="ptb1 flex column-center-center cmb1">
	<Title>{error?.name || '404'}</Title>
	<div class="errors">{error?.message || 'Page not found.'}</div>
	<pre class="filled p2 overflow-auto mb2">
		<code class="monospace">
			{error?.stack || 'No stack to view.'}
		</code>
	</pre>
    <a class="button" href={`../`}>return</a>
</div>