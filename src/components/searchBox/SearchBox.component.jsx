import styled from "styled-components/macro"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { index } from "../../hooks/algolia"
import { useSearchBox } from "react-instantsearch-hooks-web"
import { useForm, Controller } from "react-hook-form"
import Hits from "../hits"
import Search from "../../assets/icons/search.svg"

//8 hits

const SearchBox = ({ isMobile, setIsMobileSearch }) => {
	const [query, setQuery] = useState("")
	const { handleSubmit, control } = useForm({
		defaultValues: {
			searchBox: "",
		},
	})
	const navigate = useNavigate()

	const searchFn = async q => {
		return await index.search(q)
	}
	const memoizedSearch = useCallback(
		(searchQuery, search) => {
			search(searchQuery)
		},
		[query]
	)

	const { query: queryData, refine } = useSearchBox(
		memoizedSearch(query, searchFn)
	)
	// console.log(queryData)

	const onSubmit = data => {
		// console.log(data.searchBox)
		if (isMobile) {
			setIsMobileSearch(false)
		}
		navigate("/sneakers")
	}
	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* visually hidden
				 <label htmlFor=""></label> */}
				<InputWrapper>
					<Controller
						control={control}
						name="searchBox"
						render={({ field: { onChange, value, ref } }) => (
							<Input
								onChange={e => {
									// setQuery(e.target.value)
									onChange(e.target.value)
								}}
								placeholder={"Type something to search..."}
								value={value}
								ref={ref}
							/>
						)}
					/>
				</InputWrapper>
				{isMobile && (
					<Button type="submit">
						<IconContainer>
							<SearchIcon src={Search} />
						</IconContainer>
					</Button>
				)}
			</Form>

			{/* <div>div around hits that makes them position absolute</div> */}
			<Hits query={query} />
		</>
	)
}

export default SearchBox

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
const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
`

const SearchIcon = styled.img`
	width: 22px;
	height: 22px;
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
	@media (max-width: 600px) {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin: 5px 5px 0 10px;
	}
`
