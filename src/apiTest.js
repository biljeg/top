const StockXAPI = require("stockx-api")
const stockX = new StockXAPI()

export function fetchDetails() {
	stockX
		.fetchProductDetails("https://stockx.com/adidas-yeezy-boost-700-magnet")
		.then(product => console.log(product))
		.catch(err => console.log(`Error scraping product details: ${err.message}`))
}

export function fetchSearch() {
	stockX
		.newSearchProducts("yeezy", {
			limit: 5,
		})
		.then(products => console.log(products))
		.catch(err => console.log(`Error searching: ${err.message}`))
}
