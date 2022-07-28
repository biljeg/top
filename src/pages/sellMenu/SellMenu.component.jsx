import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { InstantSearch, Configure } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"

import { searchClient } from "../../hooks/initServices"
import AppContext from "../../hooks/AppContext"
import SearchBar from "../../components/searchBar"

const SellMenu = () => {
	const { user, isAuthLoading } = useContext(AppContext)
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuthLoading) return
		if (!user) {
			navigate("/login")
		}
	}, [isAuthLoading, user])

	return (
		<Content>
			<div>
				<H1>Choose a product</H1>
				<P>Find the product you're looking for to continue</P>
				<InstantSearch indexName="sneakers" searchClient={searchClient}>
					<SearchBar isSellPage={true} />
					<Configure hitsPerPage={8} />
				</InstantSearch>
			</div>
		</Content>
	)
}

export default SellMenu

const Content = styled.main`
	min-height: calc(100vh - 1px);
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 1.5rem;
	margin-top: 1.8rem;
	width: 90%;
	@media (min-width: 600px) {
		width: min(40%, 600px);
	}
`

const H1 = styled.h1`
	font-size: 18px;
	margin-block: 0.6rem;
	font-weight: 600;
`

const P = styled.p`
	font-size: 14px;
	margin-bottom: 20px;
`
