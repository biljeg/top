import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components/macro"

import AppContext from "../../hooks/AppContext"
import Preferences from "../preferences"
import { Icon, FlavorText } from "../utils"
import Modal from "../../components/modal"
import IconFacebook from "../../assets/icons/facebook.svg"
import IconYoutube from "../../assets/icons/youtube.svg"
import IconLinkedin from "../../assets/icons/linkedin.svg"
import IconTwitter from "../../assets/icons/twitter.svg"
import { Button } from "@mantine/core"
import LogoWhite from "../../assets/logos/TOP_logo_inverted.svg"
import Close from "../../assets/icons/x-lg.svg"

const Footer = () => {
	const [isOpened, setIsOpened] = useState(false)
	const { preferences } = useContext(AppContext)
	const location = useLocation()
	const currentPath = location.pathname
	if (currentPath === "/profile") return null
	if (currentPath === "/sneakers") return null
	if (currentPath === "/login") return null
	if (currentPath === "/reset-password") return null
	if (currentPath.split("/")[1] === "buy") return null
	if (currentPath.split("/")[1] === "sell") return null

	return (
		<>
			<Modal isOpened={isOpened} setIsOpened={setIsOpened} overlayOff>
				<PreferencesModal>
					<ModalHeader>
						<H3>Change your size and currency preferences.</H3>
						<CloseButton>
							<Icon src={Close} onClick={() => setIsOpened(false)}>
								Close
							</Icon>
						</CloseButton>
					</ModalHeader>

					<PreferencesContainer>
						<Preferences />
					</PreferencesContainer>
					<Button
						onClick={() => setIsOpened(false)}
						styles={{
							root: {
								borderRadius: "2px",
								fontWeight: 600,
							},
							filled: {
								backgroundColor: "#101010",
								"&:hover": {
									backgroundColor: "#101010",
									opacity: 0.9,
								},
								"&:active": {
									backgroundColor: "#101010",
									opacity: 0.9,
								},
							},
						}}
						type="submit"
					>
						Save preferences
					</Button>
				</PreferencesModal>
			</Modal>
			<FooterWrapper>
				<ItemWrapper gap="10px" gapDesktop="17px">
					<Link to="/sell">
						<H5>Sell</H5>
					</Link>
					<Link to="/sneakers">
						<H5>Search</H5>
					</Link>
					<Link to="/help">
						<H5>Help</H5>
					</Link>
					<Link to="/privacy">
						<H5>Privacy</H5>
					</Link>
					<Link to="/terms">
						<H5>Terms</H5>
					</Link>
				</ItemWrapper>
				<LogoWrapper>
					<Link to="/">
						<Icon src={LogoWhite} width="96px" height="48px" />
					</Link>
				</LogoWrapper>
				<FooterContent>
					<SocialsContainer>
						<FlavorText>Follow our socials</FlavorText>
						<ItemWrapper gap="15px">
							<a href="www.facebook.com">
								<Icon src={IconFacebook} width="16px" />
							</a>
							<a href="www.youtube.com">
								<Icon src={IconYoutube} />
							</a>
							<a href="www.linkedin.com">
								<Icon src={IconLinkedin} />
							</a>
							<a href="www.twitter.com">
								<Icon src={IconTwitter} />
							</a>
						</ItemWrapper>
					</SocialsContainer>
					<Button
						variant="outline"
						uppercase
						styles={{
							root: {
								borderRadius: "25px",
							},
							outline: {
								color: "#fafafa",
								borderColor: "#fafafa",
							},
						}}
						onClick={() => setIsOpened(true)}
					>
						<span>
							{preferences.currency.symbol} {preferences.currency.name}
						</span>
					</Button>
				</FooterContent>
			</FooterWrapper>
			<FooterWrapperMobile>
				<FooterContentMobile>
					<ItemWrapper gap="10px" marginBottom="15px">
						<Link to="/sell">
							<H5>Sell</H5>
						</Link>
						<Link to="/sneakers">
							<H5>Search</H5>
						</Link>
						<Link to="/help">
							<H5>Help</H5>
						</Link>
						<Link to="/privacy">
							<H5>Privacy</H5>
						</Link>
						<Link to="/terms">
							<H5>Terms</H5>
						</Link>
					</ItemWrapper>
					<SocialsContainer>
						<FlavorText>Follow our socials</FlavorText>
						<ItemWrapper gap="15px" marginBottom="20px">
							<a href="www.facebook.com">
								<Icon src={IconFacebook} width="16px" />
							</a>
							<a href="www.youtube.com">
								<Icon src={IconYoutube} />
							</a>
							<a href="www.linkedin.com">
								<Icon src={IconLinkedin} />
							</a>
							<a href="www.twitter.com">
								<Icon src={IconTwitter} />
							</a>
						</ItemWrapper>
					</SocialsContainer>
					<Button
						variant="outline"
						uppercase
						styles={{
							root: {
								borderRadius: "25px",
							},
							outline: {
								color: "#fafafa",
								borderColor: "#fafafa",
							},
						}}
						onClick={() => setIsOpened(true)}
					>
						<span>
							{preferences.currency.symbol} {preferences.currency.name}
						</span>
					</Button>
				</FooterContentMobile>
				<div>
					<Small>
						<span> TOP </span>2022 &copy; All rights reserved.
					</Small>
				</div>
			</FooterWrapperMobile>
		</>
	)
}

export default Footer

const FooterWrapper = styled.footer`
	display: grid;
	grid-template-columns: 235px 1fr 235px;
	align-items: center;
	height: 100px;
	background-color: ${props => props.theme.colors.veryDarkGray};
	color: ${props => props.theme.colors.veryLightGray};
	padding: 0 1.6rem;
	font-family: "Mulish", sans-serif;
	@media (min-width: 1200px) {
		padding: 0 4rem;
		grid-template-columns: 260px 1fr 260px;
	}
	@media (max-width: ${props => props.theme.breakpoints.tablet}) {
		display: none;
	}
`

const FooterWrapperMobile = styled.footer`
	font-family: "Mulish", sans-serif;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 190px;
	background-color: ${props => props.theme.colors.veryDarkGray};
	color: ${props => props.theme.colors.veryLightGray};
	padding: 1.6rem 0 1rem 0;
	@media (min-width: ${props => props.theme.breakpoints.tablet}) {
		display: none;
	}
`

const FooterContent = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
	justify-content: flex-end;
	@media (min-width: 1200px) {
		gap: 40px;
	}
`

const FooterContentMobile = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const ItemWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: ${({ gap }) => (gap ? gap : "0px")};
	margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : "0px")};
	@media (min-width: 1200px) {
		gap: ${({ gap, gapDesktop }) =>
			gapDesktop ? gapDesktop : gap ? gap : "0px"};
	}
`

const LogoWrapper = styled.div`
	margin: 0 auto;
`

const SocialsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	@media (min-width: 1200px) {
		gap: 10px;
	}
`

const Small = styled.small`
	font-size: 1rem;
	span {
		font-weight: 700;
	}
`

const H5 = styled.h5`
	font-family: "Mulish", sans-serif;
	font-size: 1.3rem;
`

const H3 = styled.h3`
	font-size: 1.2rem;
	line-height: 1.1;
	color: ${props => props.theme.colors.veryDarkGray};
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
`

const CloseButton = styled.div`
	position: absolute;
	top: 8px;
	right: 8px;
`

//MODAL STYLES//

const PreferencesModal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: min(95vw, 335px);
	padding: 16px 16px 24px 16px;
	border: 1px solid ${props => props.theme.colors.black};
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${props => props.theme.colors.white};
	border-radius: 2px;
	z-index: 3;
	gap: 1rem;
`

const PreferencesContainer = styled.div`
	display: flex;
	gap: 3rem;
`

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
`
