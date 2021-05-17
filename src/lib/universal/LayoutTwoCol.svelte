<script>

	import { scroll } from './store.js'

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }

	export let left = 14
	export let right = 60
	export let flip = false

	const columnClasses = 'row-flex-end-stretch h100vh overflow-auto grow flex'

	function set( e, name ) {
		$scroll[name + 'Top'] = e.target.scrollTop
		$scroll[name + 'Height'] = e.target.scrollHeight
	}

	$: left_ = flip ? right : left
	$: right_ = flip ? left : right
</script>



<div class="w100vw h100vh overflow-hidden cp1 flex minw{left + right}em {class_}" style={style_}>
	<div 
		class="{columnClasses}"
		on:scroll={ e => set( e, 'left') }>
		<div class="w{left_}em maxw{left_}em flex column">
			<slot name="left" />
		</div>
	</div>
	<div 
		class={columnClasses} 
		on:scroll={ e => set( e, 'right') }>
		<article class="w{right_}em maxw{right_}em justify-self-flex-start">
			<slot name="items" />
		</article>
	</div>
</div>