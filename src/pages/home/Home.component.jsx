import { useQuery } from "react-query"
import { useNavigate, Link } from "react-router-dom"
import styled from "styled-components/macro"
import { Accordion, Button } from "@mantine/core"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/autoplay"

import { getFeaturedItems } from "../../hooks/api"
import { mostPopular } from "../../hooks/constants"
import { FlavorText, LoadingScreen } from "../../components/utils"
import Carousel from "../../components/carousel"
import { Content } from "../../components/utils"
import Slide1 from "../../assets/images/slide1.jpg"
import Slide2 from "../../assets/images/slide2.jpg"
import Slide3 from "../../assets/images/slide3.jpg"
import Slide4 from "../../assets/images/slide4.jpg"
import LeftArrow from "../../assets/icons/arrow-left-circle-fill.svg"
import RightArrow from "../../assets/icons/arrow-right-circle-fill.svg"

const slides = [
	{
		flavorText: "Instant Classic",
		title: "A Ma Maniere Jordan 1",
		navigate: {
			link: "/sneakers/air-jordan-1-retro-high-og-a-ma-maniere",
			options: {},
		},
		image: Slide1,
	},
	{
		flavorText: "Just dropped",
		title: "Nike Sacai Blazer Mid Below $200",
		navigate: {
			link: "/sneakers/nike-blazer-high-sacai-black-grey",
			options: {},
		},
		image: Slide2,
	},
	{
		flavorText: "Trending Kicks",
		title: "Travis Scott, Off-White, Fragment And More Grails",
		navigate: {
			link: "/sneakers",
			options: { state: { urlQuery: "Air max" } },
		},
		image: Slide3,
	},
	{
		flavorText: "Fresh Colorway",
		title: "Nike Women's Dunk Low Vintage Navy",
		navigate: {
			link: "/sneakers/nike-dunk-low-vintage-navy-w",
			options: {},
		},
		image: Slide4,
	},
]

const Home = () => {
	const { data, isLoading, isError } = useQuery(
		"featuredItems",
		getFeaturedItems
	)

	const navigate = useNavigate()

	const filterItems = category => {
		return data?.filter(item => item.category === category).slice(0, 12)
	}
	const popularShoes = () => {
		const filteredData = mostPopular.map(filter =>
			data?.find(item => item.title === filter)
		)
		return filteredData.filter(item => item !== undefined)
	}

	if (isLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	if (isError) return <div>Error, please try again</div>

	return (
		<Content widthMobile="95vw">
			<HeroSwiper
				slidesPerView={1}
				modules={[Autoplay, Navigation]}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				navigation={{
					prevEl: ".swiper-hero-prev",
					nextEl: ".swiper-hero-next",
				}}
				spaceBetween={50}
			>
				{slides.map((item, idx) => (
					<SwiperSlide key={item.title}>
						<HeroSlide>
							<HeroText>
								<HeroTextContainer>
									<FlavorText>{item.flavorText}</FlavorText>
									<H1>{item.title}</H1>
								</HeroTextContainer>
								<Button
									variant="outline"
									uppercase
									styles={{
										root: {
											borderRadius: "2px",
										},
										outline: {
											color: "#101010",
											borderColor: "#101010",
										},
									}}
									onClick={() =>
										navigate(item.navigate.link, item.navigate.options)
									}
								>
									Shop now
								</Button>
							</HeroText>
							<HeroImage
								order={idx % 2 === 0 ? 2 : -1}
								slideImage={item.image}
							></HeroImage>
						</HeroSlide>
					</SwiperSlide>
				))}
				<div className="swiper-hero-prev">
					<ButtonIconPrev></ButtonIconPrev>
				</div>
				<div className="swiper-hero-next">
					<ButtonIconNext></ButtonIconNext>
				</div>
			</HeroSwiper>

			<CarouselSection>
				<div>
					<CarouselText>
						<H2>Most Popular</H2>
						<Link to="/sneakers">
							<CarouselLink>See All 🡢</CarouselLink>
						</Link>
					</CarouselText>
					<Carousel items={popularShoes()} />
				</div>
				<div>
					<CarouselText>
						<H2>Jordan 1</H2>
						<Link to="/sneakers" state={{ urlQuery: "Jordan 1" }}>
							<CarouselLink>See More 🡢</CarouselLink>
						</Link>
					</CarouselText>
					<Carousel items={filterItems("Air Jordan One")} />
				</div>
				<div>
					<CarouselText>
						<H2>Adidas Yeezy</H2>
						<Link to="/sneakers" state={{ urlQuery: "Yeezy" }}>
							<CarouselLink>See More 🡢</CarouselLink>
						</Link>
					</CarouselText>
					<Carousel items={filterItems("adidas Yeezy")} />
				</div>
				<div>
					<CarouselText>
						<H2>Nike Dunk</H2>
						<Link to="/sneakers" state={{ urlQuery: "Dunk" }}>
							<CarouselLink>See More 🡢</CarouselLink>
						</Link>
					</CarouselText>
					<Carousel items={filterItems("Nike Dunk")} />
				</div>
				<div>
					<CarouselText>
						<H2>Air max</H2>
						<Link to="/sneakers" state={{ urlQuery: "Air max" }}>
							<CarouselLink>See More 🡢</CarouselLink>
						</Link>
					</CarouselText>
					<Carousel
						items={
							data && data.filter(item => item.category.indexOf("Max") !== -1)
						}
					/>
				</div>
			</CarouselSection>
			<FaqSection>
				<H2 margin="1.75rem 0 2rem 0">Frequently asked questions</H2>
				<StyledAccordion
					styles={{
						item: {
							border: "1px solid #000",
							borderBottom: "none",
						},
						icon: { color: "#000" },
					}}
				>
					<Accordion.Item label="Are all items authentic?">
						<P>
							All items sold on Top are 100% authentic and brand new in the
							original box. Once a pair has sold, it is sent to our
							authentication centre where our team of experts check every detail
							to ensure every pair is genuine and unworn. Once verified, our
							team sends the pair to the buyer.
						</P>
					</Accordion.Item>

					<Accordion.Item label="Do you offer discounts and promo codes?">
						<P>
							At this moment in time, Top does not offer any discounts or promo
							codes. Any future offers, discounts or promotions will be sent out
							to customers via email. To ensure you don't miss out, create an
							account with Top and opt in to our email newsletter.
						</P>
					</Accordion.Item>

					<Accordion.Item
						label="When can I expect to receive my item?"
						style={{ borderBottom: "1px solid #000" }}
					>
						<P>
							Top strives to deliver your item to you within 3-5 business days.
							The Top shipping time frame for Buyers takes into account the time
							it takes for the Seller to ship the item to us, and the time we
							spend verifying the item at our facilities. This is to ensure that
							every item that gets into the hands of a Buyer is one they'll be
							confident displaying or wearing.
						</P>
					</Accordion.Item>
				</StyledAccordion>
			</FaqSection>
		</Content>
	)
}

export default Home

const HeroSwiper = styled(Swiper)`
	width: 100%;
	margin-bottom: 1.5rem;
`
const HeroSlide = styled.div`
	display: grid;
	width: 100%;
	grid-template-rows: 250px 200px;
	margin-bottom: 2.5rem;
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		height: 400px;
	}
	@media (min-width: 1200px) {
		height: 500px;
	}
	border: 1px solid black;
`

const HeroImage = styled.div`
	background-image: url(${({ slideImage }) => slideImage});
	background-size: cover;
	order: -1;
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		order: ${({ order }) => (order ? order : 2)};
	}
`

const HeroText = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	order: 1;
`

const CarouselSection = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`

const CarouselLink = styled.span`
	font-weight: 300;
	font-size: 1.3rem;
	:first-child {
		&:hover {
			text-decoration: underline;
		}
	}
`

const CarouselText = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: 1.5rem;
`

const HeroTextContainer = styled.div`
	padding: 0 20px 0 20px;
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		padding: 0 20px 0 40px;
	}
`

const StyledAccordion = styled(Accordion)`
	width: min(100%, 800px);
`

const FaqSection = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 1.6rem;
`

const ButtonIconPrev = styled.div`
	background-image: url(${LeftArrow});
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center;
	width: 32px;
	height: 32px;
`

const ButtonIconNext = styled.div`
	background-image: url(${RightArrow});
	background-repeat: no-repeat;
	background-size: 100% auto;
	background-position: center;
	width: 32px;
	height: 32px;
`

const H1 = styled.h1`
	font-size: 2rem;
	margin-top: 1rem;
	margin-bottom: 2rem;
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		font-size: 2.8rem;
	}
`

const H2 = styled.h2`
	font-size: 2.1rem;
	margin: ${({ margin }) => (margin ? margin : "0px")};
	@media (min-width: ${props => props.theme.breakpoints.desktop}) {
		font-size: 2.4rem;
	}
`

const P = styled.p`
	font-size: 1.3rem;
	margin-bottom: 1rem;
	line-height: 1.1;
	color: ${props => props.theme.colors.gray};
`
