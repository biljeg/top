import { useState, useEffect, useRef } from "react"
import { useInfiniteHits } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"

import { LoadingScreen } from "../../components/utils"
import ProductCard from "../../components/productCard"

const InfiniteScroll = () => {
	const sentinelRef = useRef(null)
	const ref = useRef(false)
	const { hits, isLastPage, showMore } = useInfiniteHits()
	const [isLoading, setIsLoading] = useState(true)
	const [noResults, setNoResults] = useState(false)

	useEffect(() => {
		if (ref.current) {
			if (hits.length !== 0) {
				setIsLoading(false)
				setNoResults(false)
			} else {
				setNoResults(true)
			}
		} else {
			ref.current = true
		}
	}, [hits])

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
			{isLoading ? (
				<>
					<LoadingScreen />
				</>
			) : noResults ? (
				<div>No results found.</div>
			) : (
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
				</InfiniteScrollWrapper>
			)}
			<div ref={sentinelRef} aria-hidden="true" />
		</>
	)
}

export default InfiniteScroll

const InfiniteScrollWrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, 50%);
	border-left: none;
	@media (min-width: 800px) {
		border-left: 1px solid black;
		grid-template-columns: repeat(auto-fill, 33.33%);
	}
	@media (min-width: 1200px) {
		grid-template-columns: repeat(auto-fill, 25%);
	}
`
