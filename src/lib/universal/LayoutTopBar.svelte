<script>

    import { scroll } from './store.js'

    let class_ = ""
    export { class_ as class }
    let style_ = ""
    export { style_ as style }

    export let width = 74
    export let sticky = false

    function set( e, name ) {
        $scroll[name + 'Top'] = e.target.scrollTop
        $scroll[name + 'Height'] = e.target.scrollHeight
    }

</script>

<!-- <svelte:window on:scroll={ e => set( e, 'window')} /> -->

<div 
    on:scroll={ e => set( e, 'items')} 
    class={`
        bg 
        flex 
        w100vh 
        h100vh 
        plr1
        overflow-auto`}>
    <div 
        class="flex column-stretch-flex-start margin-auto maxw{width}em h100vh grow">
        <slot name="header" />
        <slot name="subheader" />
        <slot name="body" />
        <slot name="footer" />
    </div>
</div>  