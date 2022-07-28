import { useContext } from "react"
import { Link } from "react-router-dom"
import { useHits } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"

import AppContext from "../../hooks/AppContext"

const SearchHits = ({ query, isSellPage }) => {
	const {
		preferences: { currency },
	} = useContext(AppContext)

	const { hits } = useHits()
	if (hits.length === 0) {
		return null
	}

	if (query === "") return null
	if (isSellPage) {
		return (
			<SellHitsWrapper>
				{hits.map(hit => (
					<Link to={`/sell/${hit.urlKey}`} key={hit.objectID}>
						<SellHit>
							<HitImg>
								<img src={hit.media.smallImageUrl} alt="product thumbnail" />
							</HitImg>
							<P>{hit.title}</P>
						</SellHit>
					</Link>
				))}
			</SellHitsWrapper>
		)
	}

	return (
		<HeaderHitsWrapper>
			{hits.map(hit => (
				<Link to={`/sneakers/${hit.urlKey}`} key={hit.objectID}>
					<HeaderHit>
						<HitImg>
							<img src={hit.media.smallImageUrl} alt="product thumbnail" />
						</HitImg>
						<P>{hit.title}</P>
					</HeaderHit>
				</Link>
			))}
		</HeaderHitsWrapper>
	)
}

export default SearchHits

const HeaderHitsWrapper = styled.div`
	position: absolute;
	z-index: 100;
	background-color: white;
	border-left: 1px solid black;
	width: min(800px, 40vw);
	@media (max-width: 750px) {
		width: 80vw;
	}
	@media (min-width: 750px) and (max-width: 900px) {
		width: 50vw;
	}
	@media (max-width: ${props => props.theme.breakpoints.tablet}) {
		transform: translateY(30px);
	}
`

const HeaderHit = styled.div`
	display: grid;
	grid-template-columns: 80px 1fr;
	align-items: center;
	border-bottom: 1px solid black;
	border-right: 1px solid black;
	padding: 15px;
	@media (max-width: 600px) {
		padding: 10px 15px;
		grid-template-columns: 70px 1fr;
	}
`

const SellHitsWrapper = styled.div`
	position: absolute;
	background-color: white;
	max-width: 100%;
	border-left: 1px solid black;
	width: 100%;
	@media (min-width: 550px) {
		width: min(60vw, 450px);
	}
	@media (min-width: 1000px) {
		width: min(40vw, 600px);
	}
`

const SellHit = styled.div`
	display: grid;
	grid-template-columns: 80px 1fr;
	align-items: center;
	border-bottom: 1px solid black;
	border-right: 1px solid black;
	padding: 15px;
	@media (max-width: 600px) {
		padding: 10px 15px;
		grid-template-columns: 70px 1fr;
	}
`

const HitImg = styled.div``

const P = styled.p`
	font-size: 1.5rem;
	margin-left: 2rem;
	height: 40px;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	@media (max-width: 600px) {
		font-size: 1.3rem;
		height: 32px;
	}
`
