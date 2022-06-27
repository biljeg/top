import styled from "styled-components/macro"
import { InstantSearch, Configure } from "react-instantsearch-hooks-web"
import { searchClient } from "../../hooks/algolia"
import SearchBar from "../../components/searchBar"
import { useNavigate } from "react-router-dom"
import { useEffect, useContext } from "react"
import AppContext from "../../hooks/AppContext"

const SellMenu = () => {
	const navigate = useNavigate()
	const { isLoggedIn } = useContext(AppContext)
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login")
		}
	}, [])

	return (
		<Main>
			<Content>
				<InstantSearch indexName="sneakers" searchClient={searchClient}>
					<SearchBar isSellPage={true} />
					<Configure hitsPerPage={8} />
				</InstantSearch>
			</Content>
		</Main>
	)
}

export default SellMenu

const Main = styled.main`
	display: flex;
	width: 100%;
	justify-content: center;
`

const Content = styled.main`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`
