import { useState, useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"
import styled from "styled-components/macro"
import { TailSpin } from "react-loading-icons"

import AppContext from "../../hooks/AppContext"
import LoginForm from "../../components/loginForm"

const Login = () => {
	const [googleLoading, setGoogleLoading] = useState(false)
	const { googleSignIn, logIn, signUp, user, isAuthLoading } =
		useContext(AppContext)
	const navigate = useNavigate()
	const location = useLocation()
	const mode = location.state?.isLoginPage
	const [isLoginPage, setIsLoginPage] = useState(mode || true)

	const googleOnClick = async () => {
		setGoogleLoading(true)
		await googleSignIn()
		setGoogleLoading(false)
	}

	useEffect(() => {
		if (isAuthLoading) return
		if (user) {
			navigate("/profile")
		}
	}, [isAuthLoading, user])

	return (
		<main>
			<Card>
				{isLoginPage ? (
					<FormContainer>
						<H1>Login</H1>
						<LoginForm isLoginPage={isLoginPage} action={logIn} />
					</FormContainer>
				) : (
					<FormContainer>
						<H1>Register</H1>
						<LoginForm isLoginPage={isLoginPage} action={signUp} />
					</FormContainer>
				)}
				<ButtonContainer>
					<Button
						variant="outline"
						uppercase
						styles={{
							root: {
								borderRadius: "2px",
							},
							outline: {
								color: "#101010",
								borderColor: "#101010",
							},
							label: {
								display: "flex !important",
								gap: "5px !important",
							},
						}}
						onClick={googleOnClick}
					>
						{googleLoading ? (
							<TailSpin height="25px" width="25px" stroke="#000" />
						) : (
							"Continue with Google"
						)}
					</Button>

					{isLoginPage ? (
						<SwitchMode onClick={() => setIsLoginPage(false)}>
							Don't have an account? Sign up instead
						</SwitchMode>
					) : (
						<SwitchMode onClick={() => setIsLoginPage(true)}>
							Already have an account Log In instead
						</SwitchMode>
					)}
				</ButtonContainer>
			</Card>
		</main>
	)
}

export default Login

const Card = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 450px;
	min-height: 420px;
	transform: translate(-50%, -50%);
	position: fixed;
	top: 50%;
	left: 50%;
	padding: 2.5rem 1.5rem 2rem 1.5rem;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	border: 1px solid #101010;
	background-color: white;
	border-radius: 2px;
	@media (max-width: ${props => props.theme.breakpoints.tablet}) {
		width: 370px;
		min-height: 400px;
	}
	@media (max-width: 400px) {
		width: min(97vw, 370px);
		border: none;
		box-shadow: none;
	}
`

const SwitchMode = styled.p`
	cursor: pointer;
	&:hover {
		text-decoration: underline;
	}
`

const FormContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rem;
	@media (max-width: 400px) {
		gap: 2.5rem;
	}
`

const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	text-align: center;
	margin-top: 20px;
`

const H1 = styled.h1`
	font-size: 3.5rem;
	margin-bottom: 1.6rem;
	letter-spacing: 0.05em;
	line-height: 1.1;
	color: ${props => props.theme.colors.veryDarkGray};
`
