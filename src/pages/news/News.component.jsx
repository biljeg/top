import styled from "styled-components/macro"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import BlogCard from "../../components/newsCard"
import { LoadingScreen } from "../../components/utils"
import NewsCard from "../../components/newsCard"
import { getNewsPosts, getPopularPosts } from "../../hooks/contentful"

const News = () => {
	const [newsPosts, setNewsPosts] = useState([])
	const [popularPosts, setPopularPosts] = useState([])
	const [filters, setFilters] = useState([
		{ name: "footwear", selected: false },
		{ name: "fashion", selected: false },
		{ name: "business", selected: false },
		{ name: "collectibles", selected: false },
		{ name: "ournews", selected: false },
	])
	const filterCategories = [
		"Footwear",
		"Fashion",
		"Business",
		"Collectibles",
		"Our news",
	]
	const { data, isLoading, isError } = useQuery(["newsPosts", filters], () =>
		getNewsPosts(filters)
	)
	const { data: popularPostsData } = useQuery("popularPosts", getPopularPosts)
	useEffect(() => {
		if (!data) return
		const fieldData = []
		data.forEach(item => {
			fieldData.push(item.fields)
		})
		setNewsPosts(fieldData)
	}, [data])
	useEffect(() => {
		if (!popularPostsData) return
		const fieldData = []
		popularPostsData.forEach(item => {
			fieldData.push(item.fields)
		})
		setPopularPosts(fieldData)
	}, [popularPostsData])

	const handleFilterClick = filterCategory => {
		setFilters(prevFilters =>
			prevFilters.map(item => {
				if (item.name === filterCategory) {
					return { ...item, selected: !item.selected }
				} else {
					return item
				}
			})
		)
	}

	if (isLoading)
		return (
			<>
				<h1>Latest blog posts</h1>
				<LoadingScreen />
			</>
		)

	if (isError) return <div>Error, please try again</div>
	return (
		<>
			<h1>Latest blog posts</h1>
			<NewsPageWrapper>
				<main>
					{newsPosts.length !== 0 ? (
						newsPosts.map(blog => {
							const {
								title,
								slug,
								preview,
								thumbnail,
								category,
								postDate,
								content,
							} = blog
							const readTime = Math.round(content.split(" ").length / 275)
							return (
								<NewsCard
									key={title}
									slug={slug}
									title={title}
									postDate={postDate}
									preview={preview}
									category={category}
									thumbnail={`https:${thumbnail.fields.file.url}`}
									readTime={readTime}
								/>
							)
						})
					) : (
						<div>NO RESULTS</div>
					)}
				</main>

				<aside>
					<div>
						<h3>Filter by categories</h3>
						<FilterContainer>
							{filterCategories.map(item => (
								<FilterButton
									key={item}
									onClick={() =>
										handleFilterClick(item.toLowerCase().replace(/\s/g, ""))
									}
								>
									{item}
								</FilterButton>
							))}
						</FilterContainer>
					</div>
					{popularPosts && (
						<div>
							<h2>Popular posts</h2>

							{popularPosts.map(popularPost => {
								const { title, slug } = popularPost
								return (
									<BlogCard key={title} slug={slug} title={title} popularPost />
								)
							})}
						</div>
					)}
				</aside>
			</NewsPageWrapper>
		</>
	)
}

export default News

const NewsPageWrapper = styled.div`
	display: flex;
`
const FilterContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 0.75rem;
`

const FilterButton = styled.div`
	color: white;
	text-align: center;
	border-radius: 20px;
	background-color: gray;
`
