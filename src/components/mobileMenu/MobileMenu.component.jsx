import styled from "styled-components/macro"
import { createPortal } from "react-dom"
import Close from "../../assets/icons/x-lg.svg"
import { NavLink, useLocation } from "react-router-dom"
import { useContext } from "react"
import AppContext from "../../hooks/AppContext"

const MobileMenu = ({ isMobileMenu, setIsMobileMenu }) => {
	const { isLoggedIn } = useContext(AppContext)
	const location = useLocation()
	const currentPath = location.pathname
	if (!isMobileMenu) return

	return createPortal(
		<>
			<Overlay />
			<Modal>
				<IconContainer>
					<CloseIcon src={Close} onClick={() => setIsMobileMenu(false)} />
				</IconContainer>
				<Div>
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
									<NavLink to={"/login"} state={{ isLoginPage: true }}>
										Login
									</NavLink>
								</div>
								<div>
									<NavLink to={"/login"} state={{ isLoginPage: false }}>
										Sign up
									</NavLink>
								</div>
							</>
						)
					) : null}
				</Div>
			</Modal>
		</>,
		document.getElementById("mobile-menu")
	)
}

export default MobileMenu

const Modal = styled.div`
	width: 40vw;
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	background-color: white;
	border-right: 1px solid white;
	z-index: 3;
`
const Overlay = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 2;
	background-color: rgba(0, 0, 0, 0.5);
`
const IconContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	cursor: pointer;
`
const CloseIcon = styled.img`
	margin-top: 5px;
	width: 25px;
	height: 25px;
`
const Div = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`
