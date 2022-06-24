import styled from "styled-components/macro"
import { useRefinementList } from "react-instantsearch-hooks-web"
import { useClearRefinements } from "react-instantsearch-hooks-web"
import { useRef, useState, useEffect } from "react"

const FilterMenu = () => {
	const [query, setQuery] = useState("")
	const previousQueryRef = useRef(query)
	const { items, refine } = useRefinementList({
		attribute: "category",
		operator: "and",
	})
	const { canRefine, refine: clear } = useClearRefinements()

	useEffect(() => {
		if (previousQueryRef.current !== query) {
			previousQueryRef.current = query
			refine(query)
		}
	}, [query, refine])
	return (
		<div>
			{canRefine && <div onClick={clear}>Clear Search</div>}
			{items.map(item => (
				<div key={item.value} onClick={() => setQuery(item.value)}>
					{item.value}
				</div>
			))}
		</div>
	)
}

export default FilterMenu
