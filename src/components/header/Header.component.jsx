import { NavLink } from "react-router-dom"
import styled from "styled-components/macro"

const Header = () => {
	return (
		<header>
			<Navbar>
				<ul>
					<li>
						<NavLink to={"/"}>Home</NavLink>
					</li>
					<li>
						<NavLink to={"/destinations"}>Destinations</NavLink>
					</li>
					<li>
						<NavLink to={"/blog"}>Our blog</NavLink>
					</li>
					<li>
						<NavLink to={"/about"}>About us</NavLink>
					</li>
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
