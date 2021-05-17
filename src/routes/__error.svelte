<script>
    import Title from '$lib/Title.svelte'
    import TBA from '$lib/TBA.svelte'

    export let error
    export let data
</script>

<div class="cmb1">
	<Title>{error?.name || 'Error'}</Title>
	<div class="errors">{error?.message || 'An unknown error has occured.'}</div>
	<pre class="radius2px filled p2 overflow-auto mb2">
		<code class="monospace">
			{error?.stack || 'No stack to view.'}
		</code>
	</pre>
    <a class="button" href={`../`}>Return to Homepage</a>
</div>