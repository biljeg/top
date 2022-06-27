import styled from "styled-components/macro"
import { Link, useLocation } from "react-router-dom"
import Preferences from "../preferences"

const Footer = () => {
	const location = useLocation()
	if (location.pathname === "/profile") return null
	if (location.pathname === "/sneakers") return null
	if (location.pathname === "/login") return null
	if (location.pathname.split("/")[1] === "buy") return null

	return (
		<FooterWrapper>
			<LinkWrapper>
				<Link to="/terms">
					<h5>TERMS</h5>
				</Link>
				|
				<Link to="/privacy">
					<h5>PRIVACY</h5>
				</Link>
				|
				<Link to="/">
					<h5>CONTACT US</h5>
				</Link>
				|
				<Link to="/">
					<h5>CONTACT US</h5>
				</Link>
			</LinkWrapper>
			<Preferences />
		</FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	display: flex;
	align-items: center;
	height: 100px;
	border-top: 1px solid black;
	background-color: #fafafa;
`
const LinkWrapper = styled.div`
	display: flex;
	align-items: center;
`
