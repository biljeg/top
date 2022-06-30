import styled from "styled-components/macro"
import { getProduct } from "../../hooks/getData"
import { newListing } from "../../hooks/createDocs"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import { LoadingScreen } from "../../components/utils/Utils.component"
import toast, { Toaster } from "react-hot-toast"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../hooks/AppContext"
import { Button, TextInput, NativeSelect } from "@mantine/core"
import { useForm } from "react-hook-form"
import { sizesList } from "../../components/preferences"
import { sizeChart } from "../../hooks/constants"

const SellProduct = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const {
		preferences: { sizePreference, currency },
		setPreferences,
		isLoggedIn,
		user,
	} = useContext(AppContext)
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login")
		}
	}, [])
	const uid = user?.uid
	const { urlKey } = useParams()
	const { data, isLoading, isError } = useQuery(
		[`productDetails-${urlKey}`, urlKey],
		() => getProduct(urlKey)
	)
	const { mutate: createListing } = useMutation(newListing, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
			queryClient.invalidateQueries(`productDetails-${urlKey}`)
		},
	})

	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login")
		}
	}, [])

	const sizesToDisplay = () => {
		let newSizes
		if (sizePreference === "EU") {
			newSizes = sizeChart.map(size => size.sizeEU)
		} else {
			newSizes = sizeChart.map(size => size.sizeUS)
		}
		return newSizes
	}

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
	const onSubmit = async ({ sellingPrice, selectedSize }) => {
		try {
			const sizeInfo = formatSize(selectedSize)
			const priceUSD = formatPrice(sellingPrice)
			const response = await createListing({
				uid,
				objectID: data.objectID,
				sizeInfo,
				data,
				priceUSD: Number(priceUSD),
			})
			if (response === "Listing already exists") {
				toast.error(response)
			} else {
				toast.success(response)
				setTimeout(() => {
					navigate("/")
				}, 1500)
			}
		} catch (e) {
			console.error(e.message)
		}
	}
	const handleChange = e => {
		setPreferences(prevPreferences => ({
			...prevPreferences,
			sizePreference: e.target.value,
		}))
	}
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
					<p>
						Highest Bid: {currency.symbol}
						{Math.floor(data.market.highestBid * currency.rate)}
					</p>
				</MarketDetails>
				<ImgContainer>
					<img src={data?.media.imageUrl} alt={data.title} />
				</ImgContainer>
			</ProductSection>
			<BuySection>
				<h2>Select size</h2>
				<p>
					{currency.symbol} | {sizePreference} Size
				</p>
				<NativeSelect
					value={sizePreference}
					onChange={e => handleChange(e)}
					data={sizesList}
				/>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextInput
						placeholder="Your price"
						rightSection={
							<InputRightSection>
								{currency.name.toUpperCase()}
							</InputRightSection>
						}
						rightSectionWidth={50}
						type="number"
						{...register("sellingPrice", {
							required: true,
							min: 20,
							max: 10000,
						})}
					/>
					{errors.sellingPrice?.type === "required" && (
						<p>Selling price is required</p>
					)}
					{errors.sellingPrice?.type === "min" && <p>Enter at least 20.</p>}
					{errors.sellingPrice?.type === "max" && (
						<p>Enter a price below 10000.</p>
					)}
					<NativeSelect
						data={sizesToDisplay()}
						placeholder="Select size"
						rightSection={
							<InputRightSection>{sizePreference}</InputRightSection>
						}
						rightSectionWidth={50}
						{...register("selectedSize", { required: true })}
					/>
					<Button type="submit">SELL</Button>
				</form>
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
const MarketDetails = styled.div`
	display: flex;
	gap: 1rem;
`
const ImgContainer = styled.div``

const InputRightSection = styled.div``
