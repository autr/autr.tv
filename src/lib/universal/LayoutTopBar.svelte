<script>

    import { scroll } from './store.js'

    let class_ = ""
    export { class_ as class }
    let style_ = ""
    export { style_ as style }

    export let width = 74


</script>


<div class="flex column-stretch-flex-start margin-auto maxw{width}em h100vh">
    <slot name="header" />
    <slot name="subheader" />
    <slot name="body" />
    <slot name="footer" />
</div>