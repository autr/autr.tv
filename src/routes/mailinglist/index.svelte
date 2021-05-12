<script>
    import Title from '$lib/Title.svelte'
    import ListSignup from '$lib/ezelte/src/ListSignup.svelte'
    const config = {
        root: 'http://api.autr.tv',
        user: 'autr',
        interests: [ 
            {
                key: 'artworks',
                text: 'artworks<em class="ml0-4 fade">news</em>'
            }, {
                key: 'code',
                text: 'code<em class="ml0-4 fade">open source</em>'
            }, {
                key:'personal',
                text: 'personal<em class="ml0-4 fade">miscelleny</em>'
            }
        ]
    }

    let vars = { artworks: true }
</script>

<div class="maxw24em margin-auto">
    <Title>
        Mailing list
    </Title>
    <p class="ptb1"></p>
    <ListSignup {...config} {vars} />
</div>