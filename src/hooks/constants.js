import countries from "countries-list"

export const currencyList = ["USD", "EUR", "GBP"]

const countryCodes = Object.keys(countries.countries)
export const countriesList = countryCodes.map(
	code => countries.countries[code].name
)
