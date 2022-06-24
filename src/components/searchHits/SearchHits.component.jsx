import styled from "styled-components/macro"
import { Highlight, useHits } from "react-instantsearch-hooks-web"
import { Link } from "react-router-dom"

const SearchHits = ({ query }) => {
	const { hits } = useHits()
	if (hits.length === 0) {
		return null
	}
	if (query === "") return null
	// console.log(hits)
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
						{/* make system so everything responds to 
			price change (give everthing usd price and 
				exchange it to eur or pound for now; in the 
			future use i18n library?) */}
						<p>${hit.market.lowestAsk}</p>
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
