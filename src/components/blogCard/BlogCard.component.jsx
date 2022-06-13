import styled from "styled-components/macro"
import { Link } from "react-router-dom"

const BlogCard = ({
	thumbnail,
	postDate,
	category,
	title,
	preview,
	slug,
	popularPost,
	readTime,
	relatedPost,
}) => {
	if (popularPost)
		return (
			<Link to={slug}>
				<h3>{title}</h3>
			</Link>
		)
	if (relatedPost)
		return (
			<Link to={`/blog/${slug}`}>
				<PlaceholderImage></PlaceholderImage>
				<h3>{title}</h3>
			</Link>
		)

	return (
		<Link to={slug}>
			<DestinationCardWrapper>
				<div>
					<div>
						<img src={thumbnail} alt={title} />
					</div>
					<div>
						<p>
							{postDate}-{category}
						</p>
						<h2>{title}</h2>
						<p>{preview}</p>
					</div>
					{readTime > 1 ? <p>{readTime} Minute Read</p> : <p>1 Minute Read</p>}
				</div>
			</DestinationCardWrapper>
		</Link>
	)
}

export default BlogCard

const DestinationCardWrapper = styled.article`
	display: flex;
	flex-direction: column;
`
const PlaceholderImage = styled.div`
	background-color: gray;
	width: 400px;
	height: 200px;
`
