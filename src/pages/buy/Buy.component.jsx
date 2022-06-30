import styled from "styled-components/macro"
import { getProduct } from "../../hooks/getData"
import { useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { LoadingScreen } from "../../components/utils/Utils.component"
import { useContext, useState, useEffect } from "react"
import AppContext from "../../hooks/AppContext"
import { Button } from "@mantine/core"
import { getFunctions, httpsCallable } from "../../hooks/firebase"
import initializeStripe from "../../hooks/initStripe"

const functions = getFunctions()
const createStripeCheckout = httpsCallable(functions, "createStripeCheckout")

const Buy = () => {
	const {
		preferences: { sizes, currency },
		isLoggedIn,
		user,
	} = useContext(AppContext)
	const uid = user?.uid
	const [selectedSize, setSelectedSize] = useState(null)
	const { urlKey } = useParams()
	const { data, isLoading, isError } = useQuery(
		[`productDetails-${urlKey}`, urlKey],
		() => getProduct(urlKey)
	)
	const handleClick = sizePreference => {
		setSelectedSize(sizePreference)
	}
	const formatSize = size => {
		const newSize = size[`size${sizes}`] //sizeEU for example
		const newLowestAsk = size[`lowestAsk${currency.name}`] //lowestAskUSD
		return [newSize, newLowestAsk]
	}
	const navigate = useNavigate()

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
		if (!isLoggedIn) {
			navigate("/login")
		}
	}, [])
	if (isLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	//error utility class that says error while fetching please reload
	if (isError) return <div>Error, please try again</div>
	return (
		//make this also an utility class
		<Container>
			<ProductSection>
				<H1>{data.title}</H1>
				<MarketDetails>
					<p>
						Highest bid: {currency.symbol}
						{Math.floor(data.market.highestBid * currency.rate)}
					</p>
					<p>
						Last sold: {currency.symbol}
						{Math.floor(data.market.lastSale * currency.rate)}
					</p>
				</MarketDetails>
				<ImgContainer>
					<img src={data?.media.imageUrl} alt={data.title} />
				</ImgContainer>
			</ProductSection>
			<BuySection>
				<h2>Select size</h2>
				<p>{sizes} Size | Lowest Ask</p>
				<SizeGrid>
					{data.sizes.map((size, idx) => {
						const [sizePreference, lowestAsk] = formatSize(size)
						return (
							<Size key={idx} onClick={() => handleClick(sizePreference)}>
								<p>
									{sizes} - {sizePreference}
								</p>
								<p>
									{currency.symbol}
									{lowestAsk}
								</p>
							</Size>
						)
					})}
				</SizeGrid>
				<Button onClick={() => checkout(data?.objectID)}>Continue</Button>
			</BuySection>
		</Container>
	)
}

export default Buy

const Container = styled.section`
	display: flex;
	justify-content: space-between;
	width: 100%;
`

const ProductSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50vw;
	border-right: 1px solid black;
`
const H1 = styled.h1`
	font-size: 32px;
`
const BuySection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50vw;
`
const SizeGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 0.5rem;
	row-gap: 0.25rem;
`
const MarketDetails = styled.div`
	display: flex;
	gap: 1rem;
`
const ImgContainer = styled.div``

const Size = styled.div`
	padding: 5px;
	border: 1px solid black;
`
