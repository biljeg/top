import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import styled from "styled-components/macro"
import { Button, TextInput, NativeSelect } from "@mantine/core"
import toast, { Toaster } from "react-hot-toast"

import { useProductDetails, useNewListing } from "../../hooks/api"
import AppContext from "../../hooks/AppContext"
import { sizesList } from "../../hooks/constants"
import { Content, LoadingScreen } from "../../components/utils"
import {
	formatSize,
	formatPrice,
	sizesToDisplay,
} from "../../hooks/helperFunctions"

const SellProduct = () => {
	const {
		preferences: { sizePreference, currency },
		setPreferences,
		user,
		isAuthLoading,
		uid,
	} = useContext(AppContext)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { urlKey } = useParams()

	const { data, isLoading, isError } = useProductDetails(urlKey)
	const { mutateAsync: newListing } = useNewListing()

	const onSubmit = async ({ sellingPrice, selectedSize }) => {
		try {
			const sizeInfo = formatSize(selectedSize, sizePreference)
			const priceUSD = formatPrice(sellingPrice, currency)
			const response = await newListing({
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
				queryClient.invalidateQueries("profile")
				queryClient.invalidateQueries(`productDetails-${urlKey}`)
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
			<Toaster />
			<PageWrapper>
				<ProductSection>
					<TextContainer>
						<H1>{data.title}</H1>
						<P>
							Lowest Ask: {currency.symbol}
							{data.market.lowestAsk
								? Math.trunc(data.market.lowestAsk * currency.rate)
								: "--"}
							{" | "}
							Last Sale: {currency.symbol}
							{data.market.lastSale
								? Math.trunc(data.market.lastSale * currency.rate)
								: "--"}
						</P>
						{/*
						this goes in sell section
						<p>
							Highest Bid: {currency.symbol}
							{Math.trunc(data.market.highestBid * currency.rate)}
						</p> */}
					</TextContainer>
					<ImgContainer>
						<img src={data?.media.imageUrl} alt="product" />
					</ImgContainer>
				</ProductSection>
				<SellSection>
					<H2 style={{ marginBottom: "0.2rem" }}>Sell Item</H2>
					<P>
						{currency.name} - {sizePreference} Sizes
					</P>
					<SellForm onSubmit={handleSubmit(onSubmit)}>
						<InputContainer>
							<InputWrapper>
								<Label for="select-input">Select Size</Label>
								<NativeSelect
									id="select-input"
									style={{ marginBottom: "1rem" }}
									data={sizesToDisplay(sizePreference)}
									placeholder="Select size"
									rightSection={<div>{sizePreference}</div>}
									rightSectionWidth={50}
									{...register("selectedSize", { required: true })}
								/>
							</InputWrapper>
							{errors.sellingPrice?.type === "required" && (
								<p>Selling price is required</p>
							)}
							{errors.sellingPrice?.type === "min" && <p>Enter at least 20.</p>}
							{errors.sellingPrice?.type === "max" && (
								<p>Enter a price below 10000.</p>
							)}
							<InputWrapper>
								<Label for="text-input">Input price</Label>
								<TextInput
									style={{ marginBottom: "1rem", width: "100%" }}
									id="text-input"
									placeholder="Your price"
									rightSection={<div>{currency.name.toUpperCase()}</div>}
									rightSectionWidth={50}
									type="number"
									{...register("sellingPrice", {
										required: true,
										min: 20,
										max: 10000,
									})}
								/>
							</InputWrapper>
						</InputContainer>
						<SellButton
							style={{ width: "100%" }}
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
							type="submit"
						>
							Sell
						</SellButton>
					</SellForm>
				</SellSection>
			</PageWrapper>
		</Content>
	)
}

export default SellProduct

const SellButton = styled(Button)`
	text-transform: uppercase;
	margin-top: 1rem;
	@media (max-width: 800px) {
		width: 100%;
	}
`

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

const SellSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 1rem;
`

const SellForm = styled.form`
	margin-top: 1.5rem;
`

const InputWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`

const InputContainer = styled.div`
	display: flex;
	gap: 1rem;
	flex-direction: column;
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
	font-size: 1.8rem;
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

const Label = styled.label`
	font-weight: 600;
	font-size: 1.2rem;
	@media (min-width: 750px) {
		font-size: 1.4rem;
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

const ImgContainer = styled.div`
	order: -1;
	@media (min-width: 750px) {
		order: 1;
		width: 80%;
		margin: 0 auto;
	}
`
