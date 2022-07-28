import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import styled from "styled-components/macro"
import { Button, TextInput, NativeSelect } from "@mantine/core"

import AppContext from "../../hooks/AppContext"
import { useUpdateListing, useDeleteListing } from "../../hooks/api"
import {
	formatSize,
	formatPrice,
	sizesToDisplay,
} from "../../hooks/helperFunctions"

const Listings = ({ listings, productDetailsPage }) => {
	const [editMenu, setEditMenu] = useState(null)
	const { mutateAsync: updateListing } = useUpdateListing()
	const { mutateAsync: deleteListing } = useDeleteListing()
	const queryClient = useQueryClient()
	const {
		preferences: { currency, sizePreference },
		uid,
	} = useContext(AppContext)

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
	} = useForm()

	const onSubmit = async (data, listing) => {
		if (
			data.sellingPrice === listing.price &&
			data.selectedSize === listing.size
		) {
			return setEditMenu(null)
		}
		const sizeInfo = formatSize(data.selectedSize, sizePreference)
		const priceUSD = formatPrice(data.sellingPrice, currency)
		await updateListing({
			objectID: listing.objectID,
			uid,
			price: priceUSD,
			sizeInfo,
		})
		queryClient.invalidateQueries("profileListings")
		queryClient.invalidateQueries(`productListings-${listing.urlKey}`)
		setEditMenu(null)
	}

	const removeListing = async (objectID, urlKey) => {
		await deleteListing({ objectID, uid })
		queryClient.invalidateQueries("profileListings")
		queryClient.invalidateQueries(`productListings-${urlKey}`)
	}

	if (listings.length === 0) return
	return listings.map(listing => (
		<Listing key={listing.timestamp}>
			<ImageContainer>
				<img src={listing.thumbnail} alt="product thumbnail" />
			</ImageContainer>
			<ContentContainer>
				{editMenu === listing.urlKey ? (
					<>
						<ListingForm
							onSubmit={handleSubmit(data =>
								onSubmit(
									{
										sellingPrice: Number(data.sellingPrice),
										selectedSize: data.selectedSize,
									},
									{
										price: Math.trunc(listing.price * currency.rate),
										size:
											sizePreference === "EU"
												? listing.sizeInfo.sizeEU
												: listing.sizeInfo.sizeUS,
										objectID: listing.objectID,
										urlKey: listing.urlKey,
									}
								)
							)}
						>
							<TextInput
								defaultValue={Math.trunc(listing.price * currency.rate)}
								{...register("sellingPrice", {
									required: true,
									min: 20,
									max: 10000,
								})}
								rightSection={
									<InputRightSection>{currency.name}</InputRightSection>
								}
								rightSectionWidth={50}
								style={{ width: "110px" }}
							/>
							<NativeSelect
								data={sizesToDisplay(sizePreference)}
								defaultValue={
									sizePreference === "EU"
										? listing.sizeInfo.sizeEU
										: listing.sizeInfo.sizeUS
								}
								rightSection={
									<InputRightSection>{sizePreference}</InputRightSection>
								}
								rightSectionWidth={50}
								{...register("selectedSize", {
									required: true,
								})}
							/>

							<Button
								size="xs"
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
								Apply changes
							</Button>
						</ListingForm>
						<ButtonContainer>
							<Button
								size="xs"
								variant="outline"
								onClick={() => removeListing(listing.objectID, listing.urlKey)}
								styles={{
									root: {
										borderRadius: "2px",
									},
									outline: {
										color: "#101010",
										borderColor: "#101010",
									},
									label: {
										display: "flex !important",
										gap: "5px !important",
									},
								}}
							>
								Delete
							</Button>
							<Button
								size="xs"
								variant="outline"
								onClick={() => setEditMenu(null)}
								styles={{
									root: {
										borderRadius: "2px",
									},
									outline: {
										color: "#101010",
										borderColor: "#101010",
									},
									label: {
										display: "flex !important",
										gap: "5px !important",
									},
								}}
							>
								Cancel
							</Button>
						</ButtonContainer>
					</>
				) : (
					<>
						<TitleContainer>
							{productDetailsPage ? (
								<H4>{listing.title}</H4>
							) : (
								<Link to={`/sneakers/${listing.urlKey}`}>
									<H4>{listing.title}</H4>
								</Link>
							)}
						</TitleContainer>
						<ListingDetails>
							<ListingDetailContainer>
								<ListingDetailWrapper>
									<ListingDetailHeader>Price</ListingDetailHeader>
									<ListingDetail>
										{currency.symbol}
										{Math.trunc(listing.price * currency.rate)}
									</ListingDetail>
								</ListingDetailWrapper>
								<ListingDetailWrapper>
									<ListingDetailHeader>Size</ListingDetailHeader>
									{sizePreference === "EU" ? (
										<ListingDetail>{listing.sizeInfo.sizeEU} EU</ListingDetail>
									) : (
										<ListingDetail>{listing.sizeInfo.sizeUS} US</ListingDetail>
									)}
								</ListingDetailWrapper>
							</ListingDetailContainer>
							<Button
								variant="outline"
								size="xs"
								onClick={() => {
									setEditMenu(listing.urlKey)
									reset()
								}}
								styles={{
									root: {
										borderRadius: "2px",
									},

									outline: {
										color: "#101010",
										borderColor: "#101010",
									},
									label: {
										display: "flex !important",
										gap: "5px !important",
									},
								}}
								style={{ marginLeft: "0.5rem" }}
							>
								Edit
							</Button>
						</ListingDetails>
					</>
				)}
			</ContentContainer>
		</Listing>
	))
}

export default Listings

const Listing = styled.div`
	display: flex;
	margin-top: 1rem;
`

const ImageContainer = styled.div`
	width: 64px;
	height: 45px;
	@media (max-width: 800px) {
		width: 52px;
		height: 36.5px;
	}
`

const TitleContainer = styled.div`
	width: 290px;
	@media (max-width: 800px) {
		font-size: 1.3rem;
		width: 270px;
	}
`

const ListingForm = styled.form`
	display: flex;
	align-items: center;
	gap: 1rem;
`

const InputRightSection = styled.div``

const ButtonContainer = styled.form`
	display: flex;
	align-items: center;
	gap: 1rem;
	padding-left: 1rem;
`

const ContentContainer = styled.div`
	display: flex;
	padding-left: 1.5rem;
	@media (max-width: 800px) {
		flex-direction: column;
		gap: 0.7rem;
	}
`

const ListingDetails = styled.div`
	display: flex;
	align-items: center;
`

const H4 = styled.h4`
	font-size: 1.6rem;
	@media (max-width: 800px) {
		font-weight: 600;
		font-size: 1.3rem;
	}
`

const ListingDetailHeader = styled.p`
	font-size: 1.4rem;
	font-weight: 700;
	@media (max-width: 800px) {
		font-weight: 600;
		font-size: 1.3rem;
	}
`

const ListingDetailContainer = styled.div`
	display: flex;
`

const ListingDetailWrapper = styled.div`
	margin-inline: 1rem;
	min-width: 45px;
	@media (max-width: 800px) {
		margin-inline: 0;
		margin-right: 1rem;
	}
`

const ListingDetail = styled.p`
	font-size: 1.2rem;
`
