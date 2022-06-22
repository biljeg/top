import styled from "styled-components/macro"
import { useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { index } from "../../hooks/algolia"
import { useSearchBox } from "react-instantsearch-hooks-web"
import { useForm, Controller } from "react-hook-form"
import Hits from "../hits"

//8 hits

const SearchBox = () => {
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
		navigate("/sneakers")
	}
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{/* visually hidden
				 <label htmlFor=""></label> */}
				<Controller
					control={control}
					name="searchBox"
					render={({ field: { onChange, value, ref } }) => (
						<input
							onChange={e => {
								setQuery(e.target.value)
								onChange(e.target.value)
							}}
							value={value}
							ref={ref}
						/>
					)}
				/>
			</form>

			{/* <div>div around hits that makes them position absolute</div> */}
			<Hits query={query} />
		</>
	)
}

export default SearchBox
