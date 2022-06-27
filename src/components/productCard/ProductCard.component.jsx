import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import { useContext } from "react"
import AppContext from "../../hooks/AppContext"
const ProductCard = ({ title, market, media, urlKey, condition }) => {
	const {
		preferences: { currency },
	} = useContext(AppContext)
	return (
		<StyledLink to={`/sneakers/${urlKey}`}>
			<ProductCardWrapper>
				<div>
					<img src={media.thumbUrl} alt={title} />
				</div>
				<Description>
					<h3>{title}</h3>
					<p>
						{currency.symbol}
						{Math.floor(market.lastSale * currency.rate)}
					</p>
					<p>{condition}</p>
				</Description>
			</ProductCardWrapper>
		</StyledLink>
	)
}

export default ProductCard

const ProductCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

const Description = styled.div`
	display: flex;
	flex-direction: column;
`

const StyledLink = styled(Link)`
	border-top: 1px solid black;
	border-right: 1px solid black;
	&:nth-last-child(-n + 4) {
		border-bottom: 1px solid black;
	}
`
