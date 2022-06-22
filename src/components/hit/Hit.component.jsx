import { Link } from "react-router-dom"
import styled from "styled-components/macro"

const Hit = ({ hit: { sizes, title, media, urlKey } }) => {
	return (
		<Link to={`/sneakers/${urlKey}`}>
			<HitWrapper>
				<HitImg>
					<img src={media.smallImageUrl} alt={title} />
				</HitImg>
				<h4>{title}</h4>
				{/* make system so everything responds to 
			price change (give everthing usd price and 
				exchange it to eur or pound for now; in the 
			future use i18n library?) */}
				<p>${sizes[9].lowestAskUSD}</p>
			</HitWrapper>
		</Link>
	)
}

export default Hit

const HitWrapper = styled.div`
	display: flex;
	height: 50px;
	width: 450px;
`
const HitImg = styled.div`
	width: 70px;
	height: 60px;
`
