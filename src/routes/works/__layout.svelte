<script>

	export let current = 'all'
	export let href = id => '/works/'+id
	export let list = [ 'all', 'installation', 'music video', 'performance', 'object', 'misc' ]
	export let type = 'checkbox'
	export let checked = { all: true }

	function onClick( e, id ) {
		current = id
	}
</script>
<nav id="works-nav" class="flex  ptb0-5 row-space-between-center  bb  wrap">
	<div class="flex row wrap">
		{#each list as id}
			<label class="{type} mtb0-5 grow">
				<a 
					class="unclickable flex row-center-center"
					on:click={ e => onClick( e, id ) }
					href={ href( id ) }>
						<input 
							{type}
							checked={ checked[id] } />
						<span />
						{id}
				</a>
			</label>
		{/each}
	</div>
	<!-- <slot /> -->
</nav>
<slot />