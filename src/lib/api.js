
const api = {
	get: async ( urls, fetch ) => {
		if (typeof(url) == 'string') urls = { data: urls }
		let data = {}
		const keys = Object.keys( urls )
		for (let i = 0; i < keys.length; i++ ) {
			const key = keys[i]
			const url = urls[key]
			// console.log(`[alias] ${key} -> ${url}`, url)
			const res = await fetch(url)
			if (res.ok) {
				data[key] = await res.json()
			} else {
				return { error: new Error( data )  }
			}
		}
		return data
	}
}

export default api
