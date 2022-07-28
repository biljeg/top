import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { useSearchBox } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"

import SearchIcon from "../../assets/icons/search.svg"
import SearchHits from "../searchHits"
import { Icon } from "../utils"

const SearchBar = ({ isMobileSearch, onSubmit, isSellPage }) => {
	const { query, refine } = useSearchBox()
	const [value, setValue] = useState(query)
	const { handleSubmit, control } = useForm({
		defaultValues: {
			searchBox: "",
		},
	})

	useEffect(() => {
		if (value !== query) {
			refine(value)
		}
	}, [value])

	if (isSellPage) {
		return (
			<div>
				<SellInputWrapper>
					<SellPageInput
						onChange={e => {
							setValue(e.target.value)
						}}
						placeholder={"Search for brand, color, etc. "}
						value={value}
					/>
				</SellInputWrapper>
				<SearchHits query={query} isSellPage={isSellPage} />
			</div>
		)
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<InputWrapper>
				<Controller
					control={control}
					name="searchBox"
					render={({ field: { onChange, value, ref } }) => (
						<HeaderInput
							onChange={e => {
								setValue(e.target.value)
								onChange(e.target.value)
							}}
							placeholder={"Type something to search..."}
							value={value}
							ref={ref}
						/>
					)}
				/>
			</InputWrapper>
			{isMobileSearch && (
				<Button type="submit">
					<IconContainer>
						<Icon src={SearchIcon} width="22px" height="22px" />
					</IconContainer>
				</Button>
			)}
			<SearchHits query={query} />
		</Form>
	)
}

export default SearchBar

const HeaderInput = styled.input`
	border: 0;
	width: min(800px, 40vw);
	font-size: 1.6rem;
	&:focus {
		outline: none;
	}
	@media (max-width: 750px) {
		width: 80vw;
	}
	@media (min-width: 750px) and (max-width: 900px) {
		width: 50vw;
	}
`
const SellPageInput = styled.input`
	border: 0;
	width: 100%;
	font-size: 1.6rem;
	&:focus {
		outline: none;
	}
`
const SellInputWrapper = styled.div`
	height: 30px;
	line-height: 2;
	width: 100%;
	font-family: "Mulish", sans-serif;
	border-bottom: 1px solid black;
	@media (min-width: 550px) {
		width: min(60vw, 450px);
	}
	@media (min-width: 1000px) {
		width: min(40vw, 600px);
	}
`

const InputWrapper = styled.div`
	height: 30px;
	line-height: 2;
	font-family: "Mulish", sans-serif;
	border-bottom: 1px solid black;
`

const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
`

const Button = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
`

const Form = styled.form`
	position: relative;
	@media (max-width: ${props => props.theme.breakpoints.tablet}) {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin: 5px 5px 0 10px;
	}
`
