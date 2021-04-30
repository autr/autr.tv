<script>

	import { scroll } from './store.js'

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

	export let left = 14
	export let right = 60
	export let flip = false

	const columnClasses = 'h100vh overflow-auto grow flex'

	function set( e, name ) {
		$scroll[name + 'Top'] = e.target.scrollTop
		$scroll[name + 'Height'] = e.target.scrollHeight
	}

	$: left_ = flip ? right : left
	$: right_ = flip ? left : right
</script>



<div class="w100vw h100vh overflow-hidden flex cp2 minw{left + right}em {class_}" style={style_}>
	<div 
		id="left" 
		class="row-flex-end-flex-start {columnClasses}"
		on:scroll={ e => set( e, 'left') }>
		<header class="w{left_}em maxw{left_}em flex column">
			<slot name="left" />
		</header>
	</div>
	<div 
		id="right" 
		class={columnClasses} 
		on:scroll={ e => set( e, 'right') }>
		<article class="w{right_}em maxw{right_}em justify-self-flex-start">
			<slot name="right" />
		</article>
	</div>
</div>