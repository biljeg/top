import { useRef, useState, useContext, useEffect } from "react"
import styled from "styled-components/macro"
import {
	useNumericMenu,
	useRefinementList,
	useClearRefinements,
} from "react-instantsearch-hooks-web"

import AppContext from "../../hooks/AppContext"
import { categoryFilters } from "../../hooks/constants"
import Modal from "../modal"
import Preferences from "../preferences"

const FilterMenu = ({ isMobile }) => {
	const [query, setQuery] = useState("")
	const [isCategoryOpen, setIsCategoryOpen] = useState(false)
	const [isPricesOpen, setIsPricesOpen] = useState(false)
	const previousQueryRef = useRef(query)
	const {
		preferences: { currency },
	} = useContext(AppContext)

	const priceFilters = [
		{ label: `Under ${currency.symbol}150`, end: 150 },
		{
			label: `${currency.symbol}150-${currency.symbol}250`,
			start: 150,
			end: 250,
		},
		{
			label: `${currency.symbol}250-${currency.symbol}500`,
			start: 250,
			end: 500,
		},
		{ label: `${currency.symbol}500+`, start: 500 },
	]
	const { refine: refineCategories } = useRefinementList({
		attribute: "category",
	})
	const { canRefine: canClear, refine: clear } = useClearRefinements()
	const { items: priceRanges, refine: refinePrices } = useNumericMenu({
		attribute: "market.lowestAsk",
		items: priceFilters,
	})

	const reset = () => {
		setQuery("")
		clear()
	}
	const filterByCategory = category => {
		if (previousQueryRef.current === category) {
			reset()
		} else {
			clear()
			setQuery(category)
		}
	}

	const filterByPrice = priceRange => {
		refinePrices(priceRange)
	}

	const handleClick = type => {
		if (type === "category") {
			setIsCategoryOpen(prevState => !prevState)
		} else {
			setIsPricesOpen(prevState => !prevState)
		}
	}

	useEffect(() => {
		if (previousQueryRef.current !== query) {
			previousQueryRef.current = query
			if (query !== "") refineCategories(query)
		}
	}, [query, refineCategories])
	if (isMobile) {
		return (
			<MobileWrapper>
				{canClear && <CloseButton onClick={reset}>Clear</CloseButton>}
				<Modal isOpened={isCategoryOpen} setIsOpened={setIsCategoryOpen}>
					<PreferencesModal>
						<ModalHeader>
							<p>Change your size and currency preferences.</p>
							{/* has hover effect of underline just like at goat 
							also, maybe reuse the close button styles from the carousel
							see more button? */}
							{/* <CloseButton onClick={() => setIsOpened(false)}>
								Close
							</CloseButton> */}
						</ModalHeader>

						<Preferences />
						{/* <Button onClick={() => setIsOpened(false)}>Save preferences</Button> */}
					</PreferencesModal>
				</Modal>
				<Modal isOpened={isPricesOpen} setIsOpened={setIsPricesOpen}>
					<PreferencesModal>
						<ModalHeader>
							<p>Change your size and currency preferences.</p>
							{/* has hover effect of underline just like at goat 
							also, maybe reuse the close button styles from the carousel
							see more button? */}
							{/* <CloseButton onClick={() => setIsOpened(false)}>
								Close
							</CloseButton> */}
						</ModalHeader>

						<Preferences />
						{/* <Button onClick={() => setIsOpened(false)}>Save preferences</Button> */}
					</PreferencesModal>
				</Modal>
				<MobileButton
					onClick={() => handleClick("category")}
					isOpen={isCategoryOpen}
				>
					Categories
				</MobileButton>
				<MobileButton
					onClick={() => handleClick("prices")}
					isOpen={isPricesOpen}
				>
					Prices
				</MobileButton>
			</MobileWrapper>
		)
	}

	return (
		<Wrapper>
			{canClear && (
				<div>
					<CloseButton onClick={reset}>Clear</CloseButton>
				</div>
			)}
			<div>
				<Button
					onClick={() => handleClick("category")}
					isOpen={isCategoryOpen}
					style={{ paddingRight: "0" }}
				>
					Categories
				</Button>
				{isCategoryOpen &&
					categoryFilters.map(item => (
						<Category
							key={item.value}
							selected={item.value === query}
							onClick={() => filterByCategory(item.value)}
						>
							{item.label}
						</Category>
					))}
			</div>
			<div>
				<Button
					onClick={() => handleClick("prices")}
					isOpen={isPricesOpen}
					style={{ paddingRight: "0" }}
				>
					Prices
				</Button>
				{isPricesOpen &&
					priceRanges.map(item => (
						<PriceFilter
							key={item.label}
							selected={item.isRefined}
							onClick={() => filterByPrice(item.value)}
						>
							{item.label}
						</PriceFilter>
					))}
			</div>
		</Wrapper>
	)
}

export default FilterMenu

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 1.1rem;
	text-align: right;
	gap: 3px;
	margin-top: 6rem;
	margin: 6.1rem 0.7rem 0 0;
	@media (max-width: 800px) {
		display: none;
	}
`

const MobileWrapper = styled.div`
	display: flex;
	gap: 8px;
	@media (min-width: 800px) {
		display: none;
	}
`

const Category = styled.p`
	text-decoration: ${({ selected }) => (selected ? "underline" : "none")};
	cursor: pointer;
`

const PriceFilter = styled.p`
	text-decoration: ${({ selected }) => (selected ? "underline" : "none")};
	cursor: pointer;
`

const Button = styled.button`
	font-family: "Mulish", sans-serif;
	border: none;
	appearance: none;
	background: white;
	text-decoration: ${({ isOpen }) => (isOpen ? "underline" : "none")};
	&:focus {
		outline: none;
		background: transparent;
		/* border: 1px solid transparent; */
	}
	&:active {
		outline: none;
		background: transparent;
	}
`

const MobileButton = styled.button`
	font-size: 1.2rem;
	line-height: 1.2rem;
	font-weight: 500;
	border: ${({ isOpen }) => (isOpen ? "1px solid white" : "1px solid black")};
	appearance: none;
	color: ${({ isOpen }) => (isOpen ? "white" : "black")};
	background-color: ${({ isOpen }) => (isOpen ? "black" : "white")};
	padding: 4px;
	&:focus {
		outline: none;
		/* background: transparent; */
	}
	&:active {
		outline: none;
		/* background: transparent; */
	}
`

const CloseButton = styled.button`
	font-size: 1.1rem;
	letter-spacing: 0.05rem;
	border: 1px solid black;
	appearance: none;
	color: black;
	background: white;
	&:focus {
		outline: none;
		background: white;
	}
	&:active {
		outline: none;
		background: white;
	}
	@media (max-width: 800px) {
		font-size: 1.2rem;
		font-weight: 500;
	}
`

//MODAL STYLES//

const PreferencesModal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 335px;
	padding: 16px 16px 24px 16px;
	border: 1px solid ${props => props.theme.colors.black};
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${props => props.theme.colors.white};
	border-radius: 2px;
	z-index: 3;
`

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
`
