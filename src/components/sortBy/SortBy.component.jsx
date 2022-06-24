import styled from "styled-components/macro"
import { useSortBy } from "react-instantsearch-hooks-web"
import { NativeSelect } from "@mantine/core"
import { useEffect, useState } from "react"

const SortBy = () => {
	const [value, setValue] = useState("Feature")
	const { currentRefinement, refine, hasNoResults } = useSortBy({
		items: [
			{ label: "Featured", value: "sneakers" },
			{ label: "Price (asc)", value: "sneakers_price_asc" },
			{ label: "Price (desc)", value: "sneakers_price_desc" },
			{ label: "Popular", value: "sneakers_popular" },
			{ label: "Recent", value: "sneakers_recent" },
		],
	})

	useEffect(() => {
		if (value !== currentRefinement) {
			let refinement
			switch (value) {
				case "Featured":
					refinement = "sneakers"
					break
				case "Price (asc)":
					refinement = "sneakers_price_asc"
					break
				case "Price (desc)":
					refinement = "sneakers_price_desc"
					break
				case "Popular":
					refinement = "sneakers_popular"
					break
				case "Recent":
					refinement = "sneakers_recent"
					break
				default:
					refinement = "sneakers"
			}
			refine(refinement)
		}
	}, [value])
	// initialIndex = "Featured"
	// if has no results display no results found :(
	return (
		<div>
			<NativeSelect
				data={["Featured", "Price (asc)", "Price (desc)", "Popular", "Recent"]}
				value={value}
				onChange={event => setValue(event.currentTarget.value)}
			/>
		</div>
	)
}

export default SortBy
//build a sort ui
//make it controlled
//if the value of the selected is not the same as the currentRefinement then refine
//test the hasNoResults with search
