import styled from "styled-components/macro"
import CarouselCard from "../carouselCard"

const Carousel = ({ items }) => {
	if (!items) return //guard clausovi svugdje ili ne?
	return (
		<CarouselWrapper>
			{items.map(item => (
				<CarouselCard
					title={item.title}
					lastSale={item.market.lastSale}
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
