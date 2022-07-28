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
	width: 100%;
	font-size: 1.5rem;
	&:focus {
		outline: none;
	}
`
const InputWrapper = styled.div`
	height: 30px;
	line-height: 2;
	width: 100%;
	/* font-family: "Barlow Condensed", sans-serif; */
	border-bottom: 1px solid black;
	width: 90vw;
	@media (min-width: 800px) {
		width: 100%;
	}
`
