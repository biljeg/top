import { useContext } from "react"
import styled from "styled-components/macro"
import { NativeSelect } from "@mantine/core"

import AppContext from "../../hooks/AppContext"
import { currencyList, sizesList } from "../../hooks/constants"

const Preferences = ({ isProfilePage }) => {
	const { preferences, setPreferences } = useContext(AppContext)
	const handleChange = e => {
		const value = e.target.value
		const name = e.target.name
		if (name === "sizes") {
			setPreferences(prevPreferences => ({
				...prevPreferences,
				sizePreference: value,
			}))
		} else {
			const currency = currencyList.find(item => item.name === value)
			setPreferences(prevPreferences => ({
				...prevPreferences,
				currency: currency,
			}))
		}
	}

	return (
		<>
			<SelectContainer>
				{isProfilePage ? (
					<ProfilePageHeader>Sizes</ProfilePageHeader>
				) : (
					<FooterHeader>Sizes</FooterHeader>
				)}
				<PreferencesSelect
					value={preferences.sizePreference}
					onChange={e => handleChange(e)}
					data={sizesList}
					name="sizes"
				/>
			</SelectContainer>
			<SelectContainer>
				{isProfilePage ? (
					<ProfilePageHeader>Currency</ProfilePageHeader>
				) : (
					<FooterHeader>Currency</FooterHeader>
				)}
				<PreferencesSelect
					value={preferences.currency.name}
					onChange={e => handleChange(e)}
					data={currencyList.map(item => item.name)}
					name="currency"
				/>
			</SelectContainer>
		</>
	)
}

export default Preferences

const PreferencesSelect = styled(NativeSelect)`
	margin-bottom: 1.2rem;
	max-width: 200px;
`
const SelectContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const ProfilePageHeader = styled.p`
	font-size: 1.4rem;
	margin-bottom: 0.75rem;
	line-height: 1.1;
	font-weight: 600;
	color: ${props => props.theme.colors.veryDarkGray};
	@media (max-width: 750px) {
		font-size: 1.2rem;
	}
`

const FooterHeader = styled.p`
	font-size: 1.2rem;
	margin-bottom: 0.8rem;
`
