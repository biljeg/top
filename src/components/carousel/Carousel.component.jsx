import { useContext } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components/macro"
import { Swiper, SwiperSlide } from "swiper/react"
//add scrollbar, the problem was that it wouldn't let you to position it outsite of the Swiper component
import { FlavorText } from "../utils"
import { Navigation } from "swiper"
import "swiper/css"
import "swiper/css/scrollbar"
import "swiper/css/navigation"

import AppContext from "../../hooks/AppContext"

const Carousel = ({ items }) => {
	const {
		preferences: { currency },
	} = useContext(AppContext)
	if (!items) return //guard clausovi svugdje ili ne?
	//items bi trebalo postojat ali za svaki slucaj? (ako ne uspije fetch)

	return (
		<CarouselSwiper
			slidesPerView={"auto"}
			modules={[Navigation]}
			navigation={{
				prevEl: ".swiper-product-prev",
				nextEl: ".swiper-product-next",
			}}
			breakpoints={{
				0: {
					spaceBetween: 5,
				},
				1024: {
					spaceBetween: 7,
				},
			}}
		>
			{items.map(item => (
				<SwiperSlide key={item.objectID} className="swiper-slide-product">
					<ItemCard to={`/sneakers/${item.urlKey}`}>
						<ImgContainer>
							<img src={item.media.smallImageUrl} alt="product thumbnail" />
						</ImgContainer>
						<TextContainer>
							<H4>{item.title}</H4>
							<Price>
								{currency.symbol}
								{Math.trunc(item.market.lowestAsk * currency.rate)}
							</Price>
							<FlavorText>{item.market.salesLast72Hours} sold</FlavorText>
						</TextContainer>
					</ItemCard>
				</SwiperSlide>
			))}
			<div className="swiper-product-prev">
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={3}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</div>
			<div className="swiper-product-next">
				<svg
					className="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={3}
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</div>
		</CarouselSwiper>
	)
}

export default Carousel

const CarouselSwiper = styled(Swiper)`
	width: 100%;
	margin-bottom: 1.5rem;
`

const H4 = styled.h4`
	font-size: 1.5rem;
	line-height: 1.3;
	display: -webkit-box;
	height: 40px;
	margin-bottom: 5px;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
`

const ItemCard = styled(Link)`
	display: grid;
	grid-template-rows: 90px 1fr;
	width: 170px;
	height: 200px;
	border: 1px solid black;
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		grid-template-rows: 100px 1fr;
		width: 180px;
		height: 210px;
	}
	@media (min-width: ${props => props.theme.breakpoints.desktop}) {
		grid-template-rows: 110px 1fr;
		width: 190px;
		height: 220px;
	}
`

const ImgContainer = styled.div`
	display: flex;
	justify-content: center;
`

const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0 5px 5px 5px;
	align-items: flex-start;
`

const Price = styled.p`
	font-size: 2.1rem;
	font-weight: 700;
	margin-bottom: 8px;
`
