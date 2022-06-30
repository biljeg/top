import styled from "styled-components/macro"
import { NativeSelect } from "@mantine/core"
import AppContext from "../../hooks/AppContext"
import { useContext } from "react"

export const currencyList = [
	{ name: "USD", rate: 1, symbol: "$" },
	{ name: "EUR", rate: 0.95, symbol: "€" },
	{ name: "GBP", rate: 0.82, symbol: "£" },
]
export const sizesList = ["US", "EU"]

const Preferences = () => {
	const { preferences, setPreferences } = useContext(AppContext)
	const handleChange = e => {
		const value = e.target.value
		const name = e.target.name
		const currency = currencyList.find(item => item.name === value)
		if (name === "sizes") {
			setPreferences(prevPreferences => ({
				...prevPreferences,
				sizePreference: value,
			}))
		} else {
			setPreferences(prevPreferences => ({
				...prevPreferences,
				currency: currency,
			}))
		}
	}
	return (
		<PreferencesWrapper>
			<NativeSelect
				value={preferences.sizes}
				onChange={e => handleChange(e)}
				data={sizesList}
				name="sizes"
				label="Sizes"
			/>
			<NativeSelect
				value={preferences.currency.name}
				onChange={e => handleChange(e)}
				data={currencyList.map(item => item.name)}
				name="currency"
				label="Currency"
			/>
		</PreferencesWrapper>
	)
}

const PreferencesWrapper = styled.div`
	display: flex;
	gap: 1rem;
`
export default Preferences
