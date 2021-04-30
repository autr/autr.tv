
const api = {
	get: ( url, index, whom ) => {
		const func = (async ({ fetch, page }) => {
			const fullUrl = url( page.params )
			const res = await fetch( fullUrl )
			let data = await res.json()
			if (index != undefined ) data = data[index]
			if (res.ok) return { props: { data } }
			const { message } = await res.json()
			return { error: new Error(message) }
		})
		return func
	}
}

export default api