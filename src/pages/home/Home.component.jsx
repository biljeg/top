import styled from "styled-components/macro"
import { Link } from "react-router-dom"
import { LoadingScreen } from "../../components/utils"
import { useQuery } from "react-query"
import { getFeaturedItems } from "../../hooks/getData"
import Carousel from "../../components/carousel"

const Home = () => {
	const { data, isLoading, isError } = useQuery(
		"featuredItems",
		getFeaturedItems
	)

	if (isLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	//error component that says error while fetching please reload
	if (isError) return <div>Error, please try again</div>
	const filterItems = category => {
		if (!data) return
		return data.filter(item => item.category === category)
	}
	const popularShoes = () => {
		if (!data) return
		const filters = [
			"Nike Dunk Low Retro White Black Panda (2021)",
			"adidas Yeezy Boost 350 V2 Zebra",
			"Jordan 1 Retro High White University Blue Black",
			"Nike Air Max 1 Travis Scott Cactus Jack Baroque Brown",
			"Nike Air Force 1 Low '07 White",
		]
		const filteredData = filters.map(filter =>
			data.find(item => item.title === filter)
		)
		return filteredData.filter(item => item !== undefined)
	}
	return (
		<main>
			<div>
				<div>
					<h3>Most Popular</h3>
					<Link to="/sneakers">See all shoes</Link>
				</div>
				<Carousel items={popularShoes()} />
			</div>
			<div>
				<div>
					<h3>Jordan 1</h3>
					<Link to="/sneakers">See all Jordan 1</Link>
				</div>
				<Carousel items={filterItems("Air Jordan One")} />
			</div>
			<div>
				<div>
					<h3>Adidas Yeezy</h3>
					<Link to="/sneakers">See all Adidas Yeezy shoes</Link>
				</div>
				<Carousel items={filterItems("adidas Yeezy")} />
			</div>
			<div>
				<div>
					<h3>Air max</h3>
					<Link to="/sneakers">See all Air max shoes</Link>
				</div>
				<Carousel
					items={
						data && data.filter(item => item.category.indexOf("Max") !== -1)
					}
				/>
			</div>
			{/* <div>
				<div>dunk?
					<h3></h3>
					<Link >
						See all shoes
					</Link>
				</div>
				<Carousel>z</Carousel>
			</div> */}
		</main>
	)
}

export default Home
