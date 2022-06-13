const client = require("contentful").createClient({
	space: "9dg9hzx1ani7",
	accessToken: "SoXxEb_CYhR9B4A4bpEZzXTnLuepRfI6HrF2xQsNyAk",
})

const getNewsPosts = async filters => {
	const filtersArr = []
	filters.forEach(item => {
		if (item.selected) filtersArr.push(item.name)
	})
	const queryFilters = filtersArr.toString()

	const res = await client.getEntries({
		...(queryFilters === ""
			? {}
			: { "metadata.tags.sys.id[all]": queryFilters }),
		limit: 10,
		content_type: "blogPost",
		order: "sys.createdAt",
	})
	const data = res.items
	return data
}

const getSinglePost = async slug => {
	const res = await client.getEntries({
		limit: 1,
		"fields.slug": slug,
		content_type: "blogPost",
	})
	const data = res.items[0]
	return data
}

const getRelatedPosts = async category => {
	if (category === "") return
	const res = await client.getEntries({
		"metadata.tags.sys.id[in]": category,
		limit: 3,
		content_type: "blogPost",
	})
	const data = res.items
	return data
}

const getPopularPosts = async () => {
	const res = await client.getEntries({
		"metadata.tags.sys.id[in]": "popular",
		limit: 3,
		content_type: "blogPost",
	})
	const data = res.items
	return data
}

export { getNewsPosts, getSinglePost, getPopularPosts, getRelatedPosts }
