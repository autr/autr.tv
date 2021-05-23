import fs from 'fs'
const run = async e => {
	const pkg = JSON.parse((await fs.readFileSync('package.json')).toString())
	const readme = `
LICENSE

Code: GPLv3  
Media: Gilbert Sinnott (${(new Date()).getFullYear()})

BUILD

Version: v${pkg.version}   
Date: ${(new Date()).toISOString().substr(0, 10)}`
	const media = `
IMAGES / VIDEO / MEDIA
=====================================
Gilbert Sinnott (g@sinnott.cc) © ${(new Date()).getFullYear()}
`
	await fs.writeFileSync( 'README.md', readme )
	await fs.writeFileSync( 'static/LICENSE.txt', media )
}
run()