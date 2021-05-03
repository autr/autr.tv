
const api = {
	get: ( url, index, whom ) => {
		const func = (async ({ fetch, page }) => {
			const fullUrl = url( page.params )
			let message = 'unknown error'
			try {
				const res = await fetch( fullUrl )
				let data = await res.json()
				if (index != undefined ) data = data[index]
				if (res.ok) return { props: { data } }
				const json = await res.json()
				message = json.message
			} catch(err) {
				message = err.message
			}
			return { error: new Error(message) }
		})
		return func
	}
}

export default api