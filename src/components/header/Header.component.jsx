import styled from "styled-components/macro"
import { useContext } from "react"
import { NavLink, useLocation } from "react-router-dom"
import SearchBar from "../searchBar"
import { AppContext } from "../../hooks/AppContext"

const Header = () => {
	const location = useLocation()
	const currentPath = location.pathname
	const { isLoggedIn } = useContext(AppContext)

	if (currentPath === "/login") {
		return (
			<header>
				<Navbar>
					<NavLink to={"/"}>Home (logo)</NavLink>
				</Navbar>
			</header>
		)
	}
	return (
		<header>
			<Navbar>
				<ul>
					<li>
						<NavLink to={"/"}>Home (logo)</NavLink>
					</li>
					<li>
						<NavLink to={"/sneakers"}>Sneakers</NavLink>
					</li>
					{currentPath === "/" && <SearchBar />}
					{/* {(currentPath === "/" ||
						currentPath === "/sneakers/:sneakerId" ||
					currentPath === "/sneakers") && <SearchBar />} */}
					{/* <li>
						<NavLink to={"/news"}>News</NavLink>
						</li>
						<li>
						<NavLink to={"/about"}>About</NavLink>
						</li>
						<li>
						<NavLink to={"/help"}>Help</NavLink>
						</li>
					<div>Cart</div> */}
					{currentPath !== "/profile" ? (
						isLoggedIn ? (
							<li>
								<NavLink to={"/profile"}>Profile</NavLink>
							</li>
						) : (
							<li>
								<NavLink to={"/login"}>login</NavLink>
							</li>
						)
					) : null}
				</ul>
			</Navbar>
		</header>
	)
}

export default Header

const Navbar = styled.nav`
	& > ul {
		display: flex;
		gap: 15px;
	}
`
