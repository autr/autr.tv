import fs from 'fs'
import path from 'path'

export const get = async ({ fetch, page }) => {
	return {
		status: 200,
		body: await fs.readFileSync(  './package.json', 'utf8' )
	}
}