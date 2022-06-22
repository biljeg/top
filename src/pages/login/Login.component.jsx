import styled from "styled-components/macro"
import { useState, useContext, useEffect } from "react"
import { Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import LoginForm from "../../components/loginForm"
import { AppContext } from "../../hooks/AppContext"

const Login = () => {
	const [isLoginPage, setIsLoginPage] = useState(true)
	const [googleLoading, setGoogleLoading] = useState(false)
	const { googleSignIn, logIn, signUp, isLoggedIn } = useContext(AppContext)
	const navigate = useNavigate()
	// useEffect(() => {
	// 	if (isLoggedIn) {
	// 		navigate("/profile")
	// 	}
	// }, [])
	const googleOnClick = async () => {
		//google button displays 3 dots if it is loading
		setGoogleLoading(true)
		await googleSignIn()
		setGoogleLoading(false)
	}
	return (
		<Main>
			<Secondary>
				{isLoginPage ? (
					<>
						<h1>Log in with email and password</h1>
						<LoginForm isLoginPage={isLoginPage} action={logIn} />
						<Button onClick={googleOnClick}>Continue with Google</Button>
						<p>
							Don't have an account?
							<span onClick={() => setIsLoginPage(false)}>Sign Up instead</span>
						</p>
					</>
				) : (
					<>
						<h1>Sign up with email and password</h1>
						<LoginForm isLoginPage={isLoginPage} action={signUp} />
						<Button onClick={googleOnClick}>Continue with Google</Button>
						<p>
							Already have an account?
							<span onClick={() => setIsLoginPage(true)}>Log In instead</span>
						</p>
					</>
				)}
			</Secondary>
		</Main>
	)
}

export default Login

const Main = styled.main`
	display: flex;
	justify-content: center;
`
const Secondary = styled.section`
	width: 400px;
`
