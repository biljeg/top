import { useEffect, useState } from "react"
import { useSortBy } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"
import { NativeSelect } from "@mantine/core"

import ArrowSelect from "../../assets/icons/arrow-select.svg"

const SortBy = () => {
	const [value, setValue] = useState("Feature")
	const { currentRefinement, refine } = useSortBy({
		items: [
			{ label: "Featured", value: "sneakers" },
			{ label: "Popular", value: "sneakers_popular" },
			{ label: "Recent", value: "sneakers_recent" },
			{ label: "Price (asc)", value: "sneakers_price_asc" },
			{ label: "Price (desc)", value: "sneakers_price_desc" },
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

	return (
		<NativeSelect
			data={["Featured", "Popular", "Recent", "Price (asc)", "Price (desc)"]}
			value={value}
			onChange={event => setValue(event.currentTarget.value)}
			size="xs"
			rightSection={
				<div>
					<img src={ArrowSelect} alt="" />
				</div>
			}
			styles={{
				defaultVariant: {
					border: "none",
					padding: "0 !important",
					fontSize: "1.3rem !important",
					fontFamily: "Mulish, sans-serif !important",
					fontWeight: "500",
				},
				filledVariant: {
					border: "1px solid black",
				},
				rightSection: {
					width: "15px",
				},
				root: { width: "90px", marginBlock: "5px" },
			}}
		/>
	)
}

export default SortBy
