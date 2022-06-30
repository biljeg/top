import styled from "styled-components/macro"
import {
	getProduct,
	getProductListing,
	getRelatedProducts,
} from "../../hooks/getData"
import { useQuery, useMutation, queryClient } from "react-query"
import { Link, useParams } from "react-router-dom"
import { LoadingScreen } from "../../components/utils/Utils.component"
import Carousel from "../../components/carousel"
import { useContext, useState } from "react"
import AppContext from "../../hooks/AppContext"
import { nanoid } from "nanoid"
import { Button, TextInput, NativeSelect } from "@mantine/core"
import { useForm } from "react-hook-form"
import { sizeChart } from "../../hooks/constants"
import { updateListing, deleteListing } from "../../hooks/createDocs"

const ProductDetails = () => {
	const { urlKey } = useParams()
	const {
		preferences: { currency, sizePreference },
		user,
	} = useContext(AppContext)
	const { data, isLoading, isError } = useQuery(
		[`productDetails-${urlKey}`, urlKey],
		() => getProduct(urlKey)
	)
	const { data: relatedProducts, isLoading: relatedProductLoading } = useQuery(
		["relatedProducts", data?.shoe, data?.title],
		() => getRelatedProducts(data?.shoe, data?.title),
		{
			enabled: !!data,
		}
	)
	const uid = user?.uid //uid is undefined when you refresh
	const {
		data: listing,
		isLoading: isListingLoading,
		isError: isListingError,
	} = useQuery(
		[`productListings-${data?.object}`, data?.objectID, uid],
		() => getProductListing(data?.objectID, uid),
		{
			enabled: !!uid || !!data?.objectID,
		}
	)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm()

	const { mutateAsync: updateListingMutation } = useMutation(updateListing)

	const sizesToDisplay = () => {
		let newSizes
		if (sizePreference === "EU") {
			newSizes = sizeChart.map(size => size.sizeEU)
		} else {
			newSizes = sizeChart.map(size => size.sizeUS)
		}
		return newSizes
	}

	// call mutation which
	// invalidates porfile and product

	const formatPrice = sellingPrice => {
		let priceUSD
		if (currency.name === "USD") {
			priceUSD = sellingPrice
		} else if (currency.name === "EUR") {
			priceUSD = sellingPrice * 1.05
		} else {
			priceUSD = sellingPrice * 1.22
		}
		return priceUSD
	}
	const formatSize = selectedSize => {
		let sizeUS
		let sizeEU
		if (sizePreference === "US") {
			sizeUS = selectedSize
			sizeEU = sizeChart.find(size => size.sizeUS === sizeUS).sizeEU
		} else {
			sizeEU = selectedSize
			sizeUS = sizeChart.find(size => size.sizeEU === sizeEU).sizeUS
		}
		return {
			sizeUS,
			sizeEU,
		}
	}

	const { mutate: deleteListingMutation } = useMutation(deleteListing, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
			queryClient.invalidateQueries(`productDetails-${urlKey}`)
		},
	})
	const [editMenu, setEditMenu] = useState(false)
	const onSubmit = async (data, listing) => {
		if (
			data.sellingPrice === listing.price &&
			data.selectedSize === listing.size
		) {
			return
		}
		const sizeInfo = formatSize(data.selectedSize)
		const priceUSD = formatPrice(data.sellingPrice)
		await updateListingMutation({
			objectID: listing.objectID,
			uid,
			price: priceUSD,
			sizeInfo,
		})
		queryClient.invalidateQueries("profile")
		queryClient.invalidateQueries(`productDetails-${urlKey}`)
		setEditMenu(false)
	}

	if (isLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	//error component that says error while fetching please reload
	if (isError) return <div>Error, please try again</div>
	return (
		<main>
			<Section>
				<ProductDetailsImg>
					<img src={data?.media.imageUrl} alt={data.title} />
				</ProductDetailsImg>
				<div>
					<h1>{data.title}</h1>
					<div>
						<h3>Lowest Ask:</h3>
						<p>
							{currency.symbol}
							{Math.floor(data.market.lowestAsk * currency.rate)}
						</p>
					</div>
					<div>
						<h3>Highest Bid:</h3>
						<p>
							{currency.symbol}
							{Math.floor(data.market.highestBid * currency.rate)}
						</p>
					</div>
					<div>
						<h3>Last Sale:</h3>
						<p>
							{currency.symbol}
							{Math.floor(data.market.lastSale * currency.rate)}
						</p>
					</div>
					<p>{data.brand}</p>
					<p>{data.condition}</p>
					<p>{data.colorway}</p>
					<Link to={`/buy/${urlKey}`}>
						<button>BUY</button>
					</Link>
					<Link to={`/sell/${urlKey}`}>
						<button>SELL</button>
					</Link>
				</div>
			</Section>
			<Section2>
				<h2>Details</h2>
				<p>Category: {data.category}</p>
				<p>Description: {data.description}</p>
				<p>Year: {data.year}</p>
				<p>Release Date: {data.releaseDate}</p>
				<p>Retail Price: {data.retailPrice}</p>
			</Section2>
			<div>
				{isListingLoading ? (
					isListingError ? (
						<div>Error loading listings</div>
					) : (
						<div>Loading</div>
					)
				) : isListingError ? (
					<div>Error loading listings</div>
				) : (
					listing && (
						<Section2>
							<h4>You have 1 listing for this item</h4>
							<Listing key={nanoid()}>
								<div>
									<img src={listing.thumbnail} alt={listing.title} />
								</div>
								<div>
									<p>{listing.title}</p>
									{editMenu ? (
										<div>
											<form
												onSubmit={handleSubmit(data =>
													onSubmit(data, {
														price: Math.floor(listing.price * currency.rate),
														size:
															sizePreference === "EU"
																? listing.sizeInfo.sizeEU
																: listing.sizeInfo.sizeUS,
														objectID: listing.objectID,
														urlKey: listing.urlKey,
													})
												)}
											>
												<TextInput
													defaultValue={Math.floor(
														listing.price * currency.rate
													)}
													{...register("sellingPrice", {
														required: true,
														min: 20,
														max: 10000,
													})}
												/>
												<NativeSelect
													data={sizesToDisplay()}
													defaultValue={
														sizePreference === "EU"
															? listing.sizeInfo.sizeEU
															: listing.sizeInfo.sizeUS
													}
													rightSection={
														<InputRightSection>
															{sizePreference}
														</InputRightSection>
													}
													rightSectionWidth={50}
													{...register("selectedSize", {
														required: true,
													})}
												/>
												<Button type="submit">Apply changes</Button>
											</form>
											<Button
												onClick={() =>
													deleteListingMutation({
														objectID: listing.objectID,
														uid,
													})
												}
											>
												Delete
											</Button>
											<Button onClick={() => setEditMenu(null)}>Cancel</Button>
										</div>
									) : (
										<div>
											<p>{Math.floor(listing.price * currency.rate)}</p>
											<p>
												{sizePreference === "EU"
													? listing.sizeInfo.sizeEU
													: listing.sizeInfo.sizeUS}
											</p>
											<Button onClick={() => setEditMenu(true)}>Edit</Button>
										</div>
									)}
								</div>
							</Listing>
						</Section2>
					)
				)}
			</div>
			{!relatedProductLoading && (
				<Section2>
					<h2>Related Products</h2>
					<Carousel items={relatedProducts} />
				</Section2>
			)}
		</main>
	)
}

export default ProductDetails

const Section = styled.section`
	display: flex;
`
const Section2 = styled.section`
	display: flex;
	flex-direction: column;
`

const ProductDetailsImg = styled.div`
	width: 400px;
`
const Listing = styled.div`
	display: flex;
	width: 750px;
	height: 75px;
	div {
		display: flex;
		gap: 10px;
	}
`
const InputRightSection = styled.div``
