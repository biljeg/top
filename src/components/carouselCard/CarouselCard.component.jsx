import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { useContext } from "react"
import AppContext from "../../hooks/AppContext"

const CarouselCard = ({
	smallImageUrl,
	title,
	lastSale,
	condition,
	urlKey,
}) => {
	const {
		preferences: { currency },
	} = useContext(AppContext)

	return (
		<Link to={`/sneakers/${urlKey}`}>
			<div>
				<div>
					<img src={smallImageUrl} alt={title} />
				</div>
				<div>
					<h4>{title}</h4>
					{/* lowest ask should be dependent on the currency */}
					<p>
						{currency.symbol}
						{Math.floor(lastSale * currency.rate)}
					</p>
					<p>{condition}</p>
				</div>
			</div>
		</Link>
	)
}

export default CarouselCard
