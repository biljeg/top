import styled from "styled-components/macro"
import { useInfiniteHits } from "react-instantsearch-hooks-web"
import ProductCard from "../../components/productCard"
import { useEffect, useRef, useState } from "react"

const InfiniteScroll = ({ urlQuery }) => {
	const { hits, isLastPage, showMore } = useInfiniteHits()
	const sentinelRef = useRef(null)

	useEffect(() => {
		if (sentinelRef.current !== null) {
			const observer = new IntersectionObserver(entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !isLastPage) {
						showMore()
					}
				})
			})

			observer.observe(sentinelRef.current)

			return () => {
				observer.disconnect()
			}
		}
	}, [isLastPage, showMore])

	return (
		<>
			<InfiniteScrollWrapper>
				{hits.map(hit => (
					<ProductCard
						key={hit.objectID}
						title={hit.title}
						market={hit.market}
						media={hit.media}
						urlKey={hit.urlKey}
						condition={hit.condition}
					/>
				))}
				<div ref={sentinelRef} aria-hidden="true" />
			</InfiniteScrollWrapper>
		</>
	)
}

export default InfiniteScroll

const InfiniteScrollWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20vw, 200px));
	border-left: 1px solid black;
`
