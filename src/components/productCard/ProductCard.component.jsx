import { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"

import AppContext from "../../hooks/AppContext"

const ProductCard = ({ title, market, media, urlKey, condition }) => {
	const {
		preferences: { currency },
	} = useContext(AppContext)

	return (
		<StyledLink to={`/sneakers/${urlKey}`}>
			<ProductCardWrapper>
				<ProductInfo>
					<H3>{title}</H3>
					<Price>
						{currency.symbol}
						{Math.trunc(market.lowestAsk * currency.rate)}
					</Price>
				</ProductInfo>
				<ProductImageWrapper>
					<ProductImage src={media.thumbUrl} alt="product" />
				</ProductImageWrapper>
			</ProductCardWrapper>
		</StyledLink>
	)
}

export default ProductCard

const ProductCardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`

const StyledLink = styled(Link)`
	border-top: 1px solid black;
	border-right: 1px solid black;
	&:nth-last-child(-n + 3) {
		border-bottom: 1px solid black;
	}
	@media (max-width: 800px) {
		border-right: none;
		&:nth-child(2n + 1) {
			border-right: 1px solid black;
		}
		&:nth-last-child(-n + 3) {
			border-bottom: none;
		}
		&:nth-last-child(-n + 2) {
			border-bottom: 1px solid black;
		}
	}
`

const ProductInfo = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	padding: 14px 16px;
`

const ProductImageWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 47px;
	padding: 0px 24px 24px;
	@media (min-width: 800px) {
		margin-top: 76px;
		padding: 0px 32px 24px 32px;
	}
`

const ProductImage = styled.img`
	max-height: 100%;
	max-width: 100%;
`

const Price = styled.p`
	font-weight: 700;
	font-size: 1.2rem;
	margin-left: 1.2rem;
	@media (min-width: 800px) {
		font-size: 1.3rem;
	}
`

const H3 = styled.h3`
	font-size: 1.2rem;
	font-weight: 400;
	line-height: 1.3;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	max-height: 30px;
	@media (min-width: 800px) {
		max-height: 40px;
		font-size: 1.4rem;
	}
`
