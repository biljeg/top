import styled from "styled-components/macro"
import { useContext, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import SearchBar from "../searchBar"
import { AppContext } from "../../hooks/AppContext"
import Logo from "../../assets/logos/TOP_logo.svg"
import List from "../../assets/icons/list.svg"
import Search from "../../assets/icons/search.svg"
import Close from "../../assets/icons/x-lg.svg"
import MobileMenu from "../mobileMenu/MobileMenu.component"

const Header = () => {
	const location = useLocation()
	const currentPath = location.pathname
	const { isLoggedIn } = useContext(AppContext)
	const [isMobileMenu, setIsMobileMenu] = useState(false)
	const [isMobileSearch, setIsMobileSearch] = useState(false)
	if (currentPath === "/login") {
		return (
			<HeaderLogin>
				<NavbarLogin>
					<NavLink to={"/"}>
						<LogoContainer>
							<img src={Logo} />
						</LogoContainer>
					</NavLink>
				</NavbarLogin>
			</HeaderLogin>
		)
	}
	return (
		<>
			<HeaderDesktop>
				<NavbarDesktop>
					<div>
						<div>
							<NavLink to={"/"}>
								<LogoContainer>
									<img src={Logo} />
								</LogoContainer>
							</NavLink>
						</div>
					</div>
					<div>{!(currentPath === "/sneakers") && <SearchBar />}</div>
					<MenuDesktop>
						<div>
							<NavLink to={"/sneakers"}>Sneakers</NavLink>
						</div>
						{currentPath !== "/profile" ? (
							isLoggedIn ? (
								<div>
									<NavLink to={"/profile"}>Profile</NavLink>
								</div>
							) : (
								<>
									<div>
										<NavLink to={"/login"}>login</NavLink>
									</div>
									<div>
										<NavLink to={"/login"}>Sign up</NavLink>
									</div>
								</>
							)
						) : null}
					</MenuDesktop>
				</NavbarDesktop>
			</HeaderDesktop>
			<HeaderMobile>
				<NavbarMobile>
					{isMobileSearch ? (
						<>
							<SearchBar
								isMobile={true}
								setIsMobileSearch={setIsMobileSearch}
							/>
							<IconContainer>
								<CloseIcon
									src={Close}
									onClick={() => setIsMobileSearch(false)}
								/>
							</IconContainer>
						</>
					) : (
						<>
							<MobileMenu
								isMobileMenu={isMobileMenu}
								setIsMobileMenu={setIsMobileMenu}
							/>
							<IconContainer>
								<ListIcon src={List} onClick={() => setIsMobileMenu(true)} />
							</IconContainer>
							<NavLink to={"/"}>
								<LogoContainer>
									<img src={Logo} />
								</LogoContainer>
							</NavLink>
							{!(currentPath === "/sneakers") ? (
								<IconContainer onClick={() => setIsMobileSearch(true)}>
									<SearchIcon src={Search} />
								</IconContainer>
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

const NavbarLogin = styled.nav``
const HeaderLogin = styled.nav`
	display: flex;
	justify-content: center;
`

const HeaderDesktop = styled.header`
	width: 100%;
	height: 70px;
	padding: 0 1rem;
	border-bottom: 1px solid black;
	font-family: "Barlow Condensed", sans-serif;
	text-transform: uppercase;
	@media (max-width: 600px) {
		display: none;
	}
	@media (min-width: 1200px) {
		padding: 0 2.5rem;
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
	gap: 15px;
	@media (min-width: 1200px) {
		gap: 25px;
	}
`

const HeaderMobile = styled.div`
	width: 100%;
	height: 70px;
	padding: 0 0.5rem;
	border-bottom: 1px solid black;
	/* font-family: "Barlow Condensed", sans-serif;
	text-transform: uppercase; */
	@media (min-width: 600px) {
		display: none;
	}
	@media (min-width: 1200px) {
		padding: 0 2.5rem;
	}
`
const NavbarMobile = styled.div`
	display: flex;
	height: 100%;
	align-items: center;
	justify-content: space-between;
`

const LogoContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100px;
	height: 50px;
`
const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	cursor: pointer;
`

const ListIcon = styled.img`
	width: 32px;
	height: 32px;
`
const SearchIcon = styled.img`
	width: 25px;
	height: 25px;
`
const CloseIcon = styled.img`
	margin-top: 5px;
	width: 25px;
	height: 25px;
`
const Div = styled.div`
	width: 40px;
`

/* <li>
		<NavLink to={"/news"}>News</NavLink>
		</li>
		<li>
		<NavLink to={"/about"}>About</NavLink>
		</li>
		<li>
		<NavLink to={"/help"}>Help</NavLink>
		</li>
	<div>Cart</div> */
