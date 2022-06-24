import countries from "countries-list"

const countryCodes = Object.keys(countries.countries)
export const countriesList = countryCodes.map(
	code => countries.countries[code].name
)
