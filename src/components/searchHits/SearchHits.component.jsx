import styled from "styled-components/macro"
import { Highlight, useHits } from "react-instantsearch-hooks-web"
import { Link } from "react-router-dom"
import { useContext } from "react"
import AppContext from "../../hooks/AppContext"

const SearchHits = ({ query }) => {
	const {
		preferences: { currency },
	} = useContext(AppContext)

	const { hits } = useHits()
	if (hits.length === 0) {
		return null
	}
	if (query === "") return null
	return (
		<SearchHitsWrapper>
			{hits.map(hit => (
				<Link to={`/sneakers/${hit.urlKey}`} key={hit.objectID}>
					<HitWrapper>
						<HitImg>
							<img src={hit.media.smallImageUrl} alt={hit.title} />
						</HitImg>
						<h4>
							<Highlight attribute="title" hit={hit} />
						</h4>
						<p>
							{currency.symbol}
							{Math.floor(hit.market.lastSale * currency.rate)}
						</p>
					</HitWrapper>
				</Link>
			))}
		</SearchHitsWrapper>
	)
}

export default SearchHits

const SearchHitsWrapper = styled.div`
	position: absolute;
	background-color: white;
`

const HitWrapper = styled.div`
	display: flex;
	height: 50px;
	width: 450px;
`
const HitImg = styled.div`
	width: 70px;
	height: 60px;
`
