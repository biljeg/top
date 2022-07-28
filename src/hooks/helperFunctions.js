import { sizeChart } from "./constants"

export const sizesToDisplay = sizePreference => {
	let newSizes
	if (sizePreference === "EU") {
		newSizes = sizeChart.map(size => size.sizeEU)
	} else {
		newSizes = sizeChart.map(size => size.sizeUS)
	}
	return newSizes
}

export const formatPrice = (sellingPrice, currency) => {
	let priceUSD
	if (currency.name === "USD") {
		priceUSD = sellingPrice
	} else if (currency.name === "EUR") {
		priceUSD = sellingPrice * 1.05
	} else {
		priceUSD = sellingPrice * 1.22
	}
	return priceUSD
}

export const formatSize = (selectedSize, sizePreference) => {
	let sizeUS
	let sizeEU
	if (sizePreference === "US") {
		sizeUS = selectedSize
		sizeEU = sizeChart.find(size => size.sizeUS === sizeUS).sizeEU
	} else {
		sizeEU = selectedSize
		sizeUS = sizeChart.find(size => size.sizeEU === sizeEU).sizeUS
	}
	return {
		sizeUS,
		sizeEU,
	}
}
