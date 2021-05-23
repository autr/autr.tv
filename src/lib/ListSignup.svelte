<script>
	import { ListSignup } from '$lib/ezelte/lib'
	
	const config = {
		root: 'http://api.autr.tv',
		user: 'autr',
		interests: 'artworks:news,code:open source,personal:miscelleny',
		init: 'vars=artworks,code,personal'
	}

</script>

<ListSignup {...config} class="flex column cmb1 sm-max-100 minw18em" />