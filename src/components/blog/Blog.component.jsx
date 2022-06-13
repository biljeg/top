import styled from "styled-components/macro"
import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import { LoadingScreen } from "../../components/utils"
import { getRelatedPosts, getSinglePost } from "../../hooks/contentful"
import { useParams } from "react-router-dom"
import MD from "react-markdown"
import BlogCard from "../blogCard"

const Blog = () => {
	const [post, setPost] = useState({})
	const [relatedPosts, setRelatedPosts] = useState([])
	const [category, setCategory] = useState("")
	const { slug } = useParams()
	const { data, isLoading, isError } = useQuery(["blog", slug], () =>
		getSinglePost(slug)
	)
	const { data: relatedPostsData } = useQuery(["blog", category], () =>
		getRelatedPosts(category)
	)
	useEffect(() => {
		if (!data) return
		setPost(data.fields)
		const getCategory = () => {
			let category = data.metadata?.tags.find(item => item.sys.id !== "popular")
				?.sys?.id
			if (!category) category = ""
			return category
		}
		setCategory(getCategory())
	}, [data])
	useEffect(() => {
		if (!relatedPostsData) return
		const fieldData = []
		relatedPostsData.forEach(item => {
			fieldData.push(item.fields)
		})
		setRelatedPosts(fieldData)
	}, [relatedPostsData])

	if (isLoading) return <LoadingScreen />
	if (isError) return <div>Error, please try again</div>

	return (
		<>
			<div>
				<h2>{post.title}</h2>

				{post.thumbnail && (
					<img src={post.thumbnail.fields.file.url} alt={post.title} />
				)}
			</div>

			<div>
				<MD>{post.content}</MD>
			</div>

			{relatedPosts.length !== 0 && (
				<div>
					<h2>Related posts</h2>
					<RelatedPostContainer>
						{relatedPosts.map(relatedPost => {
							const { title, slug } = relatedPost
							return (
								<BlogCard key={title} slug={slug} title={title} relatedPost />
							)
						})}
					</RelatedPostContainer>
				</div>
			)}
		</>
	)
}

export default Blog

const RelatedPostContainer = styled.div`
	display: flex;
	gap: 20px;
`
