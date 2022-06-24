import styled from "styled-components/macro"
import { NativeSelect } from "@mantine/core"
import { countriesList } from "../../hooks/constants"
import { currencyList } from "../../hooks/AppContext"
import { useContext } from "react"
import { AppContext } from "../../hooks/AppContext"

const Preferences = () => {
	const { preferences, setPreferences } = useContext(AppContext)
	const handleChange = e => {
		const value = e.target.value
		const name = e.target.name
		const currency = currencyList.find(item => item.name === value)
		if (name === "country") {
			setPreferences(prevPreferences => ({
				...prevPreferences,
				[name]: value,
			}))
		} else {
			setPreferences(prevPreferences => ({
				...prevPreferences,
				[name]: currency,
			}))
		}
	}
	return (
		<PreferencesWrapper>
			<NativeSelect
				value={preferences.country}
				onChange={e => handleChange(e)}
				data={countriesList}
				name="country"
				label="Select Country"
			/>
			<NativeSelect
				value={preferences.currency.name}
				onChange={e => handleChange(e)}
				data={currencyList.map(item => item.name)}
				name="currency"
				label="Select Currency"
			/>
		</PreferencesWrapper>
	)
}

const PreferencesWrapper = styled.div`
	display: flex;
	gap: 1rem;
`
export default Preferences
