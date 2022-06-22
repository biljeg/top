import styled from "styled-components/macro"
import { history } from "instantsearch.js/es/lib/routers"
import { searchClient } from "../../hooks/algolia"
import { InstantSearch } from "react-instantsearch-hooks-web"

import SearchBox from "../searchBox"

const routing = {
	router: history(),
	stateMapping: {
		stateToRoute(uiState) {
			const sneakersUiState = uiState.sneakers
			return {
				q: sneakersUiState.query,
			}
		},
		routeToState(routeState) {
			return {
				sneakers: {
					query: routeState.q,
				},
			}
		},
	},
}

const SearchBar = ({ isMobile, setIsMobileSearch }) => {
	return (
		<>
			<InstantSearch
				indexName="sneakers"
				searchClient={searchClient}
				routing={routing}
			>
				<SearchBox isMobile={isMobile} setIsMobileSearch={setIsMobileSearch} />
			</InstantSearch>
		</>
	)
}

export default SearchBar
