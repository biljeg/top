import styled from "styled-components/macro"
import { getProduct, getRelatedProducts } from "../../hooks/getData"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { LoadingScreen } from "../../components/utils/Utils.component"
import Carousel from "../../components/carousel"

const ProductDetails = () => {
	const { urlKey } = useParams()
	const { data, isLoading, isError } = useQuery(
		["productDetails", urlKey],
		() => getProduct(urlKey)
	)
	const { data: relatedProducts, isLoading: relatedProductLoading } = useQuery(
		["relatedProducts", data?.shoe, data?.title],
		() => getRelatedProducts(data?.shoe, data?.title),
		{
			enabled: !!data,
		}
	)
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
					{/* make system so everything responds to 
			price change (give everthing usd price and 
			exchange it to eur or pound for now; in the 
			future use i18n library?) */}
					<h1>{data.title}</h1>
					<div>
						<h3>Lowest Ask:</h3>
						<p>${data.sizes[9].lowestAskUSD}</p>
					</div>
					<div>
						<h3>Highest Bid:</h3>
						<p>${data.sizes[9].highestBidUSD}</p>
					</div>
					<div>
						<h3>Last Sale:</h3>
						<p>${data.sizes[9].lastSaleUSD}</p>
					</div>
					<p>{data.brand}</p>
					<p>{data.condition}</p>
					<p>{data.colorway}</p>
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
