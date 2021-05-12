<script>
    export let social = {
        instagram: 'https://instagram.com/autr.tv',
        vimeo: 'https://vimeo.com/autr',
        github: 'https://github.com/autr',
        facebook: 'https://facebook.com/autr.tv',
        email: 'mailto:ping@autr.tv'
    }

    const colours = {
        instagram: '#ffdc7d', // #c32aa3
        vimeo: '#7cd1ec', // #1ab7ea
        facebook: '#b7a896', //'#8ebfff' // #1877f2
        github: '#e6e6e6', // #e84312
        email: '#e6e6e6', // #e84312
    }
    let active, timeout

    function onHover( o ) {
        if (timeout) clearTimeout( timeout )
            console.log(o, '!!!')
        active = o
        timeout = setTimeout( e => active = null, 1000 )
    }
</script>

<div class="flex column cmt1">
    <div
        class:hidden={!active}
        class="align-self-flex-start plr1 radius1px filled"
        style={`
            background-color: ${colours[active?.name]}
        `}>
        {active?.name}
    </div>
    <div class="flex row-stretch-flex-start cmr0-5 ">
        {#each Object.entries( social ) as [name, link]}
            <a 
                style={`
                    color: ${colours[name]};
                    border-color: ${colours[name]};
                `}
                on:mouseover={ e => onHover( { name, link } )}
                href={link}
                target="_blank"
                rel="external" 
                class="b1-solid grow ptb0-4 text-center">
                {name[0]}
            </a>
        {/each}
    </div>
</div>