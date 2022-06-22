import styled from "styled-components/macro"
import { useLocation } from "react-router-dom"
import Preferences from "../preferences"

const Footer = () => {
	const location = useLocation()
	if (location.pathname === "/profile") return null
	if (location.pathname === "/sneakers") return null

	return (
		<FooterWrapper>
			<Preferences />
		</FooterWrapper>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	display: flex;
	align-items: center;
	height: 200px;
	background-color: slategray;
`
