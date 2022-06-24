import styled from "styled-components/macro"
import { useSearchBox } from "react-instantsearch-hooks-web"
import { useEffect, useState } from "react"

const FilterSearchBar = ({ urlQuery = "" }) => {
	const { query, refine } = useSearchBox()
	const [value, setValue] = useState(urlQuery)
	useEffect(() => {
		if (value !== query) {
			refine(value)
		}
	}, [value])

	return (
		<InputWrapper>
			<Input
				type="text"
				value={value}
				placeholder="Search for sneaker, brand, colorway..."
				onChange={e => setValue(e.target.value)}
			/>
		</InputWrapper>
	)
}

export default FilterSearchBar

const Input = styled.input`
	border: 0;
	width: min(800px, 40vw);
	font-size: 16px;
	&:focus {
		outline: none;
	}
	@media (max-width: 600px) {
		width: 70vw;
	}
`
const InputWrapper = styled.div`
	height: 30px;
	line-height: 2;
	font-family: "Barlow Condensed", sans-serif;
	border-bottom: 1px solid black;
`
