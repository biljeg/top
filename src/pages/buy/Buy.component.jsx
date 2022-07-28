import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components/macro"
import { Button } from "@mantine/core"

import AppContext from "../../hooks/AppContext"
import { useProductDetails } from "../../hooks/api"
import { getFunctions, httpsCallable } from "../../hooks/firebase"
import initializeStripe from "../../hooks/initServices"
import { Content, LoadingScreen } from "../../components/utils"

const functions = getFunctions()
const createStripeCheckout = httpsCallable(functions, "createStripeCheckout")

const Buy = () => {
	const [selectedSize, setSelectedSize] = useState(null)
	const {
		preferences: { sizePreference, currency },
		user,
		isAuthLoading,
		uid,
	} = useContext(AppContext)
	const { urlKey } = useParams()
	const navigate = useNavigate()

	console.log(selectedSize)

	const { data, isLoading, isError } = useProductDetails(urlKey)

	const handleClick = size => {
		setSelectedSize(size)
	}
	const format = size => {
		const newSize = size[`size${sizePreference}`] //sizeEU for example
		const newLowestAsk = size[`lowestAsk${currency.name}`] //lowestAskUSD
		return [newSize, newLowestAsk]
	}
	const checkout = async objectID => {
		try {
			const response = await createStripeCheckout({
				objectID: objectID,
				size: selectedSize,
				uid: uid,
			})
			const sessionId = response.data.id
			const stripe = await initializeStripe()
			await stripe.redirectToCheckout({
				sessionId: sessionId,
			})
		} catch (e) {
			console.error(e.message)
		}
	}

	useEffect(() => {
		if (isAuthLoading) return
		if (!user) {
			navigate("/login")
		}
	}, [isAuthLoading, user])

	if (isLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	if (isError) return <div>Error, please try again</div>
	return (
		<Content
			widthMobile="95vw"
			widthTablet="90vw"
			widthDesktop="min(85vw, 1200px)"
		>
			<PageWrapper>
				<ProductSection>
					<TextContainer>
						<H1>{data.title}</H1>
						<P>
							Highest Bid: {currency.symbol}
							{data.market.highestBid
								? Math.trunc(data.market.highestBid * currency.rate)
								: "--"}
							{" | "}
							Last Sale: {currency.symbol}
							{data.market.lastSale
								? Math.trunc(data.market.lastSale * currency.rate)
								: "--"}
						</P>
					</TextContainer>
					<ImgContainer>
						<img src={data?.media.imageUrl} alt="product" />
					</ImgContainer>
				</ProductSection>
				<BuySection>
					<H2>Select size</H2>
					<P>{sizePreference} Sizes - Lowest Ask</P>
					<SizeGrid>
						{data.sizes.map(size => {
							const [formattedSize, lowestAsk] = format(size)
							return (
								<Size
									key={size.sizeEU}
									onClick={() => handleClick(formattedSize)}
									selected={formattedSize === selectedSize}
								>
									<p>
										{sizePreference} {formattedSize}
									</p>
									<p>
										{currency.symbol}
										{lowestAsk}
									</p>
								</Size>
							)
						})}
					</SizeGrid>
					<Button
						onClick={() => checkout(data?.objectID)}
						disabled={!selectedSize}
						styles={{
							root: {
								borderRadius: "2px",
								fontWeight: 600,
							},
							filled: {
								backgroundColor: "#101010",
								"&:hover": {
									backgroundColor: "#101010",
									opacity: 0.9,
								},
								"&:active": {
									backgroundColor: "#101010",
									opacity: 0.9,
								},
							},
						}}
						style={{
							textTransform: "uppercase",
						}}
					>
						Continue
					</Button>
				</BuySection>
			</PageWrapper>
		</Content>
	)
}

export default Buy

const PageWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-rows: 73px 1fr;
	@media (min-width: 750px) {
		grid-template-rows: 1fr;
		grid-template-columns: 60% 40%;
	}
`

const ProductSection = styled.div`
	display: grid;
	grid-template-columns: 100px 1fr;
	border: 1px solid black;
	@media (min-width: 750px) {
		border: none;
		grid-template-rows: 1fr 4fr;
		grid-template-columns: 1fr;
	}
`

const TextContainer = styled.div`
	order: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-left: 1.5rem;
	@media (min-width: 750px) {
		justify-content: flex-start;
		align-items: center;
		padding-left: 0;
		order: -1;
	}
`

const H1 = styled.h1`
	font-size: 1.4rem;
	max-width: 300px;
	@media (min-width: 750px) {
		font-size: 2.8rem;
		height: 38px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		max-width: none;
	}
`

const H2 = styled.h2`
	font-size: 1.4rem;
	@media (min-width: 750px) {
		margin-top: none;
		font-size: 2.4rem;
	}
`

const P = styled.p`
	font-size: 1.2rem;
	@media (min-width: 750px) {
		font-size: 1.4rem;
	}
`

const BuySection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 1rem;
`

const SizeGrid = styled.div`
	margin-block: 2rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 0.8rem;
	row-gap: 0.4rem;
`

const ImgContainer = styled.div`
	order: -1;
	@media (min-width: 750px) {
		order: 1;
		width: 80%;
		margin: 0 auto;
	}
`

const Size = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 8px;
	cursor: pointer;
	font-weight: 600;
	border: ${({ selected }) =>
		selected ? "1px solid white" : "1px solid black"};
	background-color: ${({ selected }) => (selected ? "black" : "white")};
	color: ${({ selected }) => (selected ? "white" : "black")};
`
