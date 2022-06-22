import styled from "styled-components/macro"
import { NativeSelect } from "@mantine/core"
import { currencyList, countriesList } from "../../hooks/constants"
import { useContext } from "react"
import { AppContext } from "../../hooks/AppContext"

const Preferences = () => {
	const { preferences, setPreferences } = useContext(AppContext)
	const handleChange = e => {
		const value = e.target.value
		const name = e.target.name
		setPreferences(prevPreferences => ({ ...prevPreferences, [name]: value }))
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
				value={preferences.currency}
				onChange={e => handleChange(e)}
				data={currencyList}
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