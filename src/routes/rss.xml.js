import fetch from 'cross-fetch'

const site = 'https://autr.tv'
const title = `Autr / Gilbert Sinnott`

const xml = async e => {

	const res = await fetch( `http://localhost:3000/api/autr/items/posts`  )
	if (!res.ok) {
		const { message } = await res.json()
		return { error: new Error(message) }
	}
	let data = (await res.json()).filter( item => item.status == 'published' ).sort( (a,b) => b.date - a.date)


	return `<?xml version="1.0" encoding="UTF-8" ?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
	<channel>
		<title><![CDATA[${title} - Posts]]></title>
		<description><![CDATA[Gilbert Sinnott is an artist]]></description>
		<link>${site}</link>
		<atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
		<generator>https://github.com/autr/tv</generator>
		<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
		${data.map( post => {
			const date = new Date(post.date * 1000)
			const time = date.toString()
			const year = date.getFullYear()
			const idx = time.indexOf( year ) + 4
			const utc = date.toUTCString()
			const url = `${site}/feed/${year}/${post.id}`
			return `
				<item>
					<title><![CDATA[${ time.substring(0,idx) }]]></title>
					<description><![CDATA[${post.text}]]></description>
					<link>${url}</link>
					<guid isPermaLink="false">${url}</guid>
					<pubDate>${utc}</pubDate>
				</item>
			`
		}).join('\n')}
	</channel>
</rss>

	`
}

export async function get() {
	return {
		body: await xml()
	}
}