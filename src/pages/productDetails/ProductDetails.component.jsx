import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import styled from "styled-components/macro"
import { Button } from "@mantine/core"

import AppContext from "../../hooks/AppContext"
import {
	getProductListing,
	getRelatedProducts,
	useProductDetails,
} from "../../hooks/api"
import { Content, LoadingScreen } from "../../components/utils"
import Carousel from "../../components/carousel"
import Listings from "../../components/listings"
import Image1 from "../../assets/icons/authenticated.svg"
import Image2 from "../../assets/icons/deadstock.svg"
import Image3 from "../../assets/icons/delivery.svg"

const ProductDetails = () => {
	const {
		preferences: { currency, sizePreference },
		uid,
	} = useContext(AppContext)
	const { urlKey } = useParams()
	const navigate = useNavigate()
	const { data, isLoading, isError } = useProductDetails(urlKey)
	const {
		data: relatedProducts,
		isLoading: relatedProductLoading,
		isError: relatedProductError,
	} = useQuery(
		[`relatedProducts-${urlKey}`, data?.shoe, data?.title],
		() => getRelatedProducts(data?.shoe, data?.title),
		{
			enabled: !!data,
		}
	)
	const {
		data: listing,
		isLoading: isListingLoading,
		isError: isListingError,
	} = useQuery(
		[`productListings-${urlKey}`, data?.objectID, uid],
		() => getProductListing(data?.objectID, uid),
		{
			enabled: !!uid && !!data?.objectID,
		}
	)

	const formatReleaseDate = date => {
		const arr = date.split("-")
		const releaseDate = `${arr[2]}/${arr[1]}/${arr[0]}`
		return releaseDate
	}

	if (isLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)

	if (isError) return <div>Error, please try again</div>
	return (
		<Content>
			<BuyingSection>
				<ProductDetailsImg>
					<img src={data?.media.imageUrl} alt="product" />
				</ProductDetailsImg>
				<TextContainer>
					<H1Container>
						<H1>{data.title}</H1>
					</H1Container>
					<ShortDescription>
						<PriceContainer>
							<div>
								<FlavorText fontSize="1.6rem">Lowest Ask</FlavorText>
								<Price>
									{currency.symbol}
									{Math.trunc(data.market.lowestAsk * currency.rate)}
								</Price>
							</div>
							<div>
								<FlavorText fontSize="1.6rem">Highest Bid</FlavorText>
								<Price>
									{currency.symbol}
									{Math.trunc(data.market.highestBid * currency.rate)}
								</Price>
							</div>
							<div>
								<FlavorText fontSize="1.6rem">Last Sale</FlavorText>
								<Price>
									{currency.symbol}
									{Math.trunc(data.market.lastSale * currency.rate)}
								</Price>
							</div>
						</PriceContainer>
						<ButtonContainer>
							<Button
								onClick={() => navigate(`/buy/${urlKey}`)}
								size="lg"
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
								Buy
							</Button>
							<Button
								onClick={() => navigate(`/sell/${urlKey}`)}
								size="lg"
								variant="outline"
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
								style={{
									textTransform: "uppercase",
								}}
							>
								Sell
							</Button>
						</ButtonContainer>
					</ShortDescription>
				</TextContainer>
			</BuyingSection>
			<DetailsSection>
				<div>
					<FlavorText style={{ marginBottom: "5px" }}>Description</FlavorText>
					<MainText
						dangerouslySetInnerHTML={{ __html: `<p>${data.description}<p>` }}
					></MainText>
				</div>
				<DetailsContainer>
					<DetailsWrapper>
						<FlavorText>Condition</FlavorText>
						<MainText>{data.condition}</MainText>
					</DetailsWrapper>
					<DetailsWrapper>
						<FlavorText>Colorway</FlavorText>
						<MainText>{data.colorway}</MainText>
					</DetailsWrapper>
					<DetailsWrapper>
						<FlavorText>Category</FlavorText>
						<MainText> {data.category}</MainText>
					</DetailsWrapper>
					<DetailsWrapper>
						<FlavorText>Gender</FlavorText>
						<MainText>
							{data.gender.charAt(0).toUpperCase() + data.gender.slice(1)}
						</MainText>
					</DetailsWrapper>
					<DetailsWrapper>
						<FlavorText>Retail Price</FlavorText>
						<MainText>${data.retailPrice}</MainText>
					</DetailsWrapper>
					<DetailsWrapper>
						<FlavorText>Year</FlavorText>
						<MainText>{data.year}</MainText>
					</DetailsWrapper>
					<DetailsWrapper>
						<FlavorText>Release Date</FlavorText>
						<MainText>
							{data.releaseDate ? formatReleaseDate(data.releaseDate) : "--"}
						</MainText>
					</DetailsWrapper>
				</DetailsContainer>
			</DetailsSection>
			<TrustSection>
				<TrustItemWrapper>
					<TrustImageContainer>
						<Image src={Image1} alt="" />
					</TrustImageContainer>
					<TrustTextContainer>
						<TrustHeading>Authenticated</TrustHeading>
						<TrustText>
							All items are 100% authentic. Each item is carefully inspected to
							guarantee authenticity.
						</TrustText>
					</TrustTextContainer>
				</TrustItemWrapper>
				<TrustItemWrapper>
					<TrustImageContainer>
						<Image src={Image2} alt="" />
					</TrustImageContainer>
					<TrustTextContainer>
						<TrustHeading>Brand New & Unused</TrustHeading>
						<TrustText>
							Every item is brand new, unused and in its original box.
						</TrustText>
					</TrustTextContainer>
				</TrustItemWrapper>
				<TrustItemWrapper>
					<TrustImageContainer>
						<Image src={Image3} alt="" />
					</TrustImageContainer>
					<TrustTextContainer>
						<TrustHeading>Quick Delivery</TrustHeading>
						<TrustText>
							Once authenticated, most domestic items are delivered quickly and
							securely with UPS. Deliveries outside of the UK are handled by DHL
							Express.
						</TrustText>
					</TrustTextContainer>
				</TrustItemWrapper>
			</TrustSection>
			{isListingLoading ? (
				<div>Loading</div>
			) : isListingError ? (
				<div>Error loading listings</div>
			) : (
				listing && (
					<ListingSection>
						<H2>You have 1 listing for this item</H2>
						<Listings listings={[listing]} productDetailsPage />
					</ListingSection>
				)
			)}
			{!relatedProductLoading &&
				(relatedProductError ? (
					<div>Error fetching related products</div>
				) : (
					<>
						<H2>Related Products</H2>
						<Carousel isProductDetails items={relatedProducts} />
					</>
				))}
		</Content>
	)
}

export default ProductDetails

const FlavorText = styled.h4`
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	font-weight: 600;
	font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.2rem")};
`

const TrustHeading = styled.h4`
	text-transform: uppercase;
	letter-spacing: 0.1rem;
	font-weight: 600;
	font-size: 1.4rem;
	@media (min-width: 1000px) {
		font-size: 1.8rem;
	}
`

const TrustText = styled.p`
	font-size: 1.1rem;
	@media (min-width: 1000px) {
		font-size: 1.4rem;
	}
`

const ListingSection = styled.section`
	width: 100%;
	margin-bottom: 2rem;
`

const H1 = styled.h1`
	margin-bottom: 1.2rem;
	font-size: 2.8rem;
	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 2.1rem;
	}
`

const H2 = styled.h2`
	margin-bottom: 1.2rem;
	font-size: 2.1rem;
`

const PriceContainer = styled.h4`
	display: flex;
	gap: 2rem;
	padding-left: 3rem;
`

const Price = styled.h4`
	font-family: "Mulish", sans-serif;
	font-size: 2.1rem;
`

const BuyingSection = styled.section`
	width: 100%;
	display: grid;
	grid-template-columns: 40% 60%;
	margin-bottom: 2rem;
	@media (max-width: 600px) {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 200px;
	}
`

const DetailsSection = styled.section`
	width: 100%;
	display: grid;
	grid-template-columns: 70% 30%;
	@media (max-width: 800px) {
		margin-block: 2rem;
	}
	@media (max-width: 600px) {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(2, 1fr);
	}
`
const TrustSection = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 3rem;
`

const Image = styled.img`
	width: 100px;
`

const ProductDetailsImg = styled.div``

const H1Container = styled.div`
	display: flex;
	justify-content: center;
`

const DetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-left: 1rem;
	@media (max-width: 600px) {
		margin-top: 2rem;
		margin-left: 0;
	}
`

const DetailsWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
`

const ShortDescription = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	padding: 2rem;
`

const ButtonContainer = styled.div`
	display: flex;
	gap: 2rem;
`

const TextContainer = styled.div`
	@media (max-width: 800px) {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`

const TrustItemWrapper = styled.div`
	display: grid;
	max-width: 550px;
	grid-template-columns: 1fr 4fr;
	margin-bottom: 1rem;
	@media (max-width: 800px) {
		grid-template-columns: 1fr 5fr;
	}
`

const TrustImageContainer = styled.div`
	padding: 1rem 1rem 1rem 0;
`

const TrustTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	@media (max-width: 600px) {
		gap: 0.5rem;
	}
`

const P = styled.p`
	font-size: 1.1rem;
`
const MainText = styled.p`
	font-size: 1.4rem;
`
