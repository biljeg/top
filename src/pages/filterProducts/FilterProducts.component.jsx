import { useLocation } from "react-router-dom"
import { Index, InstantSearch } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"

import { searchClient } from "../../hooks/initServices"
import InfiniteScroll from "../../components/infiniteScroll"
import FilterSearchBar from "../../components/filterSearchBar"
import SortBy from "../../components/sortBy"
import FilterMenu from "../../components/filterMenu"

const FilterProducts = () => {
	const location = useLocation()
	const urlQuery = location.state?.urlQuery

	return (
		<InstantSearch indexName="sneakers" searchClient={searchClient}>
			<Main>
				<Aside>
					<FilterMenu />
				</Aside>
				<Content>
					<SearchBarContainer>
						<FilterSearchBar urlQuery={urlQuery} />
					</SearchBarContainer>
					<SortByWrapper>
						<FilterMenu isMobile />
						<SortBy />
					</SortByWrapper>
					<InfiniteScroll />
					<Index indexName="sneakers" />
				</Content>
				<Aside></Aside>
			</Main>
		</InstantSearch>
	)
}

export default FilterProducts

const Main = styled.main`
	display: flex;
	width: 100%;
	margin-top: 6rem;
	@media (max-width: 800px) {
		margin-top: 4rem;
		justify-content: center;
	}
`

const Content = styled.section`
	width: 100%;
`

const Aside = styled.aside`
	width: max(100px, 12.5vw);
	@media (max-width: 800px) {
		display: none;
	}
`

const SortByWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	@media (max-width: 800px) {
		justify-content: space-between;
		padding-inline: 1rem;
		align-items: center;
	}
`

const SearchBarContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	margin-bottom: 3rem;
`
