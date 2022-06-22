import { useHits } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"
import Hit from "../hit"

const Hits = ({ query }) => {
	const { hits } = useHits()
	if (hits.length === 0) {
		// you should return a component that says search no results found
		return null
	}
	if (query === "") return null
	// console.log(hits)
	return (
		<div>
			{hits.map(hit => (
				<div key={hit.objectID}>{hit.title}</div>
			))}
		</div>
	)
}

export default Hits
