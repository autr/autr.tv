<script>
export let error
export let data
</script>

<div class="cmb1">
	<div>{error.name}</div>
	<div>{error.message}</div>
	<pre class="filled p2 overflow-auto">
		<code class="monospace">
			{error.stack}
		</code>
	</pre>
</div>