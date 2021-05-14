<script>

    import { scroll } from './store.js'

    let class_ = ""
    export { class_ as class }
    let style_ = ""
    export { style_ as style }

    export let width = 74

    function set( e, name ) {
        $scroll[name + 'Top'] = e.target.scrollTop || window.scrollY
        $scroll[name + 'Height'] = e.target.scrollHeight || window.innerHeight
    }

</script>

<!-- <svelte:window on:scroll={ e => set( e, 'window')} /> -->

<div on:scroll={ e => set( e, 'main')} class="block flex fill overflow-auto">
    <div 
        class="flex column-stretch-flex-start margin-auto maxw{width}em h100vh">
        <slot name="header" />
        <slot name="subheader" />
        <slot name="body" />
        <slot name="footer" />
    </div>
</div>  