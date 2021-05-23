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
	await fs.writeFileSync( 'README.md', readme )
}
run()