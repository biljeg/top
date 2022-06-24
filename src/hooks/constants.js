import countries from "countries-list"
// currency: { name: "USD", rate: 1, symbol: "$" },
// you must update so it can be saved in localstorage
// and update the preferences component
export const currencyList = [
	{ name: "USD", rate: 1, symbol: "$" },
	{ name: "EUR", rate: 0.95, symbol: "€" },
	{ name: "GBP", rate: 0.82, symbol: "£" },
]

const countryCodes = Object.keys(countries.countries)
export const countriesList = countryCodes.map(
	code => countries.countries[code].name
)
