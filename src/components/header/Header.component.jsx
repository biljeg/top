import { useContext, useEffect, useState } from "react"
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"
import { Configure, InstantSearch } from "react-instantsearch-hooks-web"
import styled from "styled-components/macro"
import Menu from "react-burger-menu/lib/menus/slide"
import disableScroll from "disable-scroll"

import { searchClient } from "../../hooks/initServices"
import SearchBar from "../searchBar"
import AppContext from "../../hooks/AppContext"
import { Icon } from "../../components/utils"
import Logo from "../../assets/logos/TOP_logo.svg"
import Search from "../../assets/icons/search.svg"
import Close from "../../assets/icons/x-lg.svg"
import Profile from "../../assets/icons/profile.svg"
import Hamburger from "../../assets/icons/list.svg"

const styles = {
	bmBurgerButton: {
		display: "none",
	},
	bmCrossButton: {
		height: "24px",
		width: "24px",
	},
	bmCross: {
		background: "#101010",
	},
	bmMenuWrap: {
		position: "fixed",
		height: "100%",
	},
	bmMenu: {
		background: "#fff",
		fontSize: "1.15em",
	},
	bmItemList: {
		color: "#101010",
		padding: "0.8em",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	bmItem: {
		display: "inline-block",
	},
	bmOverlay: {
		background: "rgba(0, 0, 0, 0.3)",
	},
}

const Header = () => {
	const [isMobileMenu, setIsMobileMenu] = useState(false)
	const [isMobileSearch, setIsMobileSearch] = useState(false)
	const { user } = useContext(AppContext)
	const location = useLocation()
	const currentPath = location.pathname
	const navigate = useNavigate()

	const onSubmit = data => {
		if (isMobileSearch) {
			setIsMobileSearch(false)
		}
		navigate("/sneakers", { state: { urlQuery: data.searchBox } })
	}

	useEffect(() => {
		if (isMobileMenu) {
			disableScroll.on()
		} else {
			disableScroll.off()
		}
	}, [isMobileMenu, setIsMobileMenu])

	if (currentPath === "/login") {
		return (
			<HeaderLogin>
				<nav>
					<NavLink to="/">
						<Icon
							src={Logo}
							width="150px"
							height="75px"
							mobileWidth="120px"
							mobileHeight="60px"
						/>
					</NavLink>
				</nav>
			</HeaderLogin>
		)
	}

	if (
		currentPath.split("/")[1] === "buy" ||
		currentPath.split("/")[1] === "sell"
	) {
		return (
			<HeaderBuySell>
				<NavbarBuySell>
					<Link to="/">
						<Icon
							src={Logo}
							width="100px"
							height="50px"
							mobileWidth="82px"
							mobileHeight="41px"
						/>
					</Link>
					<NavLink to="/help">
						<FaqLink>FAQ</FaqLink>
					</NavLink>
				</NavbarBuySell>
			</HeaderBuySell>
		)
	}
	return (
		<>
			<HeaderDesktop>
				<NavbarDesktop>
					<Link to="/">
						<Icon src={Logo} width="100px" height="50px" />
					</Link>
					<div>
						{!(currentPath === "/sneakers") && (
							<InstantSearch indexName="sneakers" searchClient={searchClient}>
								<SearchBar />
								<Configure hitsPerPage={8} />
							</InstantSearch>
						)}
					</div>
					<MenuDesktop>
						<DesktopNavLink to={"/sneakers"}>Sneakers</DesktopNavLink>
						<DesktopNavLink $bold to={"/sell"}>
							Sell
						</DesktopNavLink>
						<DesktopNavLink to={"/help"}>Help</DesktopNavLink>
						{user ? (
							<Link to={"/profile"}>
								<ProfileIcon src={Profile} />
							</Link>
						) : (
							<>
								<DesktopNavLink to="/login" state={{ isLoginPage: true }}>
									Login
								</DesktopNavLink>
								<DesktopNavLink to="/login" state={{ isLoginPage: false }}>
									Register
								</DesktopNavLink>
							</>
						)}
					</MenuDesktop>
				</NavbarDesktop>
			</HeaderDesktop>
			<Menu
				styles={styles}
				isOpen={isMobileMenu}
				onClose={() => setIsMobileMenu(false)}
			>
				<MobileNavLink onClick={() => setIsMobileMenu(false)} to={"/sneakers"}>
					Sneakers
				</MobileNavLink>
				<MobileNavLink onClick={() => setIsMobileMenu(false)} to={"/sell"}>
					Sell
				</MobileNavLink>
				<MobileNavLink onClick={() => setIsMobileMenu(false)} to={"/help"}>
					Help
				</MobileNavLink>
				{user ? (
					<MobileNavLink onClick={() => setIsMobileMenu(false)} to={"/profile"}>
						Profile
					</MobileNavLink>
				) : (
					<>
						<MobileNavLink
							onClick={() => setIsMobileMenu(false)}
							to="/login"
							state={{ isLoginPage: true }}
						>
							Login
						</MobileNavLink>
						<MobileNavLink
							onClick={() => setIsMobileMenu(false)}
							to="/login"
							state={{ isLoginPage: false }}
						>
							Register
						</MobileNavLink>
					</>
				)}
			</Menu>
			<HeaderMobile>
				<NavbarMobile>
					{isMobileSearch ? (
						<>
							<InstantSearch indexName="sneakers" searchClient={searchClient}>
								<SearchBar
									isMobile={true}
									setIsMobileSearch={setIsMobileSearch}
									onSubmit={onSubmit}
								/>
								<Configure hitsPerPage={8} />
							</InstantSearch>
							<Icon
								src={Close}
								onClick={() => setIsMobileSearch(false)}
								margin-top="5px"
								width="25px"
								height="25px"
							/>
						</>
					) : (
						<>
							<Icon
								src={Hamburger}
								width="32px"
								height="32px"
								onClick={() => setIsMobileMenu(true)}
							/>
							<NavLink to="/">
								<Icon src={Logo} width="96px" height="48px" />
							</NavLink>
							{!(currentPath === "/sneakers") ? (
								<Icon
									onClick={() => setIsMobileSearch(true)}
									src={Search}
									width="25px"
									height="25px"
								/>
							) : (
								<Div></Div>
							)}
						</>
					)}
				</NavbarMobile>
			</HeaderMobile>
		</>
	)
}

export default Header

const HeaderBuySell = styled.nav`
	width: 100%;
	height: 70px;
	padding: 0 1.6rem;
	border-bottom: 1px solid black;
	text-transform: uppercase;
	background-color: ${props => props.theme.colors.white};
	font-family: "Mulish";
	font-weight: 300;
	@media (min-width: 1200px) {
		padding: 0 4rem;
	}
	@media (max-width: ${props => props.theme.breakpoints.tablet}) {
		height: 60px;
	}
`

const NavbarBuySell = styled.nav`
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`

const HeaderLogin = styled.nav`
	display: flex;
	justify-content: center;
	height: 80px;
	border-bottom: 1px solid black;
	@media (max-width: ${props => props.theme.breakpoints.tablet}) {
		height: 65px;
	}
`

const HeaderDesktop = styled.header`
	width: 100%;
	height: 70px;
	padding: 0 1.6rem;
	border-bottom: 1px solid black;
	background-color: ${props => props.theme.colors.white};
	@media (max-width: 750px) {
		display: none;
	}
	@media (min-width: 1200px) {
		padding: 0 4rem;
	}
`

const NavbarDesktop = styled.nav`
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`
const MenuDesktop = styled.div`
	display: flex;
	align-items: center;
	gap: 1.5rem;
	@media (min-width: 1200px) {
		gap: 2.5rem;
	}
`

const HeaderMobile = styled.div`
	width: 100%;
	height: 70px;
	padding: 0 0.8rem;
	border-bottom: 1px solid black;
	/* font-family: "Barlow Condensed", sans-serif;
	text-transform: uppercase; */
	@media (min-width: 750px) {
		display: none;
	}
	@media (min-width: 1200px) {
		padding: 0 4rem;
	}
	/* margin-bottom: 5.1rem; */
`
const NavbarMobile = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`

const Div = styled.div`
	width: 40px;
`

const DesktopNavLink = styled(NavLink)`
	font-family: "Mulish", sans-serif;
	font-weight: ${({ $bold }) => ($bold ? "700" : "400")};
	font-size: 1.4rem;
	&.active {
		text-decoration: underline;
	}
`

const MobileNavLink = styled(NavLink)`
	font-family: "Mulish", sans-serif;
	font-weight: 300;
	text-transform: uppercase;
	text-decoration: underline;
	margin-block: 0.5rem;
	font-size: 1.8rem;
	&.active {
		font-weight: 700;
	}
`

const ProfileIcon = styled.img`
	width: 24px;
	height: 24px;
	@media (min-width: ${props => props.theme.breakpoints.desktop}) {
		width: 27px;
		height: 27px;
	}
`

const FaqLink = styled.p`
	font-family: "Inter", sans-serif;
	font-size: 2rem;
	font-weight: 700;
	color: #101010;
	@media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
		font-size: 1.8rem;
	}
`
