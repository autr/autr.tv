<script>

	let class_ = ""
	export { class_ as class }
	let style_ = ""
	export { style_ as style }
</script>

<h4 class="f2 {class_}" style={style_}>
    <span class="inline-block bb">
        <slot />
    </span>
</h4>