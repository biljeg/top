import { NavLink } from "react-router-dom"
import styled from "styled-components/macro"

const Header = () => {
	return (
		<header>
			<Navbar>
				<ul>
					<li>
						<NavLink to={"/"}>Home (logo)</NavLink>
					</li>
					{/* <li>
						<NavLink to={"/news"}>News</NavLink>
					</li>
					<li>
						<NavLink to={"/about"}>About</NavLink>
					</li>
					<li>
						<NavLink to={"/help"}>Help</NavLink>
					</li>
					<div>Cart</div>
					<li>
						<NavLink to={"/profile"}>Profile</NavLink>
					</li> */}
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
