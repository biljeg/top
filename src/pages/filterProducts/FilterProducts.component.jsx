import styled from "styled-components/macro"
import { Index, InstantSearch } from "react-instantsearch-hooks-web"
// import { history } from "instantsearch.js/es/lib/routers"
import { searchClient } from "../../hooks/algolia"
import InfiniteScroll from "../../components/infiniteScroll"
import FilterSearchBar from "../../components/filterSearchBar"
import { useLocation } from "react-router-dom"
import SortBy from "../../components/sortBy"
import FilterMenu from "../../components/filterMenu"
// const routing = {
// 	router: history(),
// 	stateMapping: {
// 		stateToRoute(uiState) {
// 			const sneakersUiState = uiState.sneakers
// 			return {
// 				q: sneakersUiState.urlQuery,
// 			}
// 		},
// 		routeToState(routeState) {
// 			return {
// 				sneakers: {
// 					urlQuery: routeState.q,
// 				},
// 			}
// 		},
// 	},
// }

// index
// 	.setSettings({
// 		replicas: ["products_price_desc"],
// 	})
// 	.then(() => {
// 		// done
// 	})

const FilterProducts = () => {
	//<100, 100-200, 200-500, 500+

	//filter by: category, price ranges,

	const location = useLocation()
	const urlQuery = location.state?.urlQuery
	return (
		<Main>
			<Content>
				<InstantSearch
					indexName="sneakers"
					searchClient={searchClient}
					// routing={routing}
				>
					<FilterSearchBar urlQuery={urlQuery} />
					<SortBy />
					<FilterMenu />
					<InfiniteScroll />
					<Index indexName="sneakers" />
				</InstantSearch>
			</Content>
		</Main>
	)
}

export default FilterProducts

const Main = styled.main`
	display: flex;
	width: 100%;
	justify-content: center;
`

const Content = styled.main`
	width: 100%;
	@media (min-width: 800px) {
		width: 80vw;
	}
	@media (min-width: 1100px) {
		width: min(70vw, 1100px);
	}
	flex-direction: column;
	justify-content: center;
`
