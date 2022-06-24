import { Link, useParams } from "react-router-dom"
import styled from "styled-components/macro"

const CarouselCard = ({
	smallImageUrl,
	title,
	lowestAskUSD,
	lowestAskGBP,
	lowestAskEUR,
	condition,
	urlKey,
}) => {
	return (
		<Link to={`/sneakers/${urlKey}`}>
			<div>
				<div>
					<img src={smallImageUrl} alt={title} />
				</div>
				<div>
					<h4>{title}</h4>
					{/* lowest ask should be dependent on the currency */}
					<p>${lowestAskUSD}</p>
					<p>{condition}</p>
				</div>
			</div>
		</Link>
	)
}

export default CarouselCard
