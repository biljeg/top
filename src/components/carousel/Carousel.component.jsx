import styled from "styled-components/macro"
import ProductCard from "../productCard"

const Carousel = ({ items }) => {
	if (!items) return
	return (
		<CarouselWrapper>
			{items.map(item => (
				<ProductCard
					title={item.title}
					lowestAskUSD={item.sizes[9].lowestAskUSD}
					lowestAskEUR={item.sizes[9].lowestAskEUR}
					lowestAskGBP={item.sizes[9].lowestAskGBP}
					urlKey={item.urlKey}
					condition={item.condition}
					smallImageUrl={item.media.smallImageUrl}
					key={item.objectID}
				/>
			))}
		</CarouselWrapper>
	)
}

export default Carousel
const CarouselWrapper = styled.div`
	display: flex;
	gap: 20px;
`
