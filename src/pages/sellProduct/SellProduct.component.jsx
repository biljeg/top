import styled from "styled-components/macro"
import { getProduct } from "../../hooks/getData"
import { newListing } from "../../hooks/createDocs"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { LoadingScreen } from "../../components/utils/Utils.component"
import toast, { Toaster } from "react-hot-toast"
import { useContext, useState, useEffect } from "react"
import AppContext from "../../hooks/AppContext"
import { Button } from "@mantine/core"

const SellProduct = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const {
		preferences: { sizes, currency },
		isLoggedIn,
		user,
	} = useContext(AppContext)
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login")
		}
	}, [])
	const uid = user?.uid
	const [selectedSize, setSelectedSize] = useState(null)
	const { urlKey } = useParams()
	const { data, isLoading, isError } = useQuery(
		[`productDetails${urlKey}`, urlKey],
		() => getProduct(urlKey)
	)
	const handleClick = sizePreference => {
		setSelectedSize(sizePreference)
	}
	const { mutate: createListing } = useMutation(newListing, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
			queryClient.invalidateQueries(`productDetails${urlKey}`)
		},
	})
	const formatSize = size => {
		const newSize = size[`size${sizes}`] //sizeEU for example
		const newHighestBid = size[`highestBid${currency.name}`] //lowestAskUSD
		return [newSize, newHighestBid]
	}
	const sell = async objectID => {
		try {
			const response = await createListing({ uid, objectID })
			if (response === "Listing already exists") {
				toast(response)
			} else {
				toast(response)
				navigate("/")
			}
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
			<Toaster />
			<ProductSection>
				<H1>{data.title}</H1>
				<MarketDetails>
					<p>
						Lowest Ask: {currency.symbol}
						{Math.floor(data.market.lowestAsk * currency.rate)}
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
				<p>{sizes} Size | Highest Bid</p>
				<strong>--here would be input box--</strong>
				<SizeGrid>
					{data.sizes.map((size, idx) => {
						const [sizePreference, highestBid] = formatSize(size)
						return (
							<SizeContainer
								key={idx}
								onClick={() => handleClick(sizePreference)}
							>
								{selectedSize === sizePreference ? (
									<SelectedSize>
										<p>
											{sizes} - {sizePreference}
										</p>
										<p>
											{currency.symbol}
											{highestBid}
										</p>
									</SelectedSize>
								) : (
									<Size>
										<p>
											{sizes} - {sizePreference}
										</p>
										<p>
											{currency.symbol}
											{highestBid}
										</p>
									</Size>
								)}
							</SizeContainer>
						)
					})}
				</SizeGrid>
				<Button onClick={() => sell()}>SELL</Button>
			</BuySection>
		</Container>
	)
}

export default SellProduct

const Container = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`

const ProductSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50vw;
	border-bottom: 1px solid black;
`
const H1 = styled.h1`
	font-size: 32px;
`
const BuySection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const SizeGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(8, 1fr);
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
const SelectedSize = styled.div`
	padding: 5px;
	background-color: gray;
	border: 1px solid black;
`
const SizeContainer = styled.div`
	cursor: pointer;
`
