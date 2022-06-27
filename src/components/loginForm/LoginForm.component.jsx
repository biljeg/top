import styled from "styled-components/macro"
import { useForm } from "react-hook-form"
import { TextInput, Button, PasswordInput } from "@mantine/core"
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import AppContext from "../../hooks/AppContext"

const LoginForm = ({ isLoginPage, action }) => {
	const {
		register,
		handleSubmit,
		unregister,
		formState: { errors: validationErrors },
	} = useForm({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	})
	const { loginError, signOut } = useContext(AppContext)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		if (isLoginPage) {
			unregister("username")
		}
	}, [isLoginPage])

	const onSubmit = data => {
		//submit button displays 3 dots if it is loading
		setLoading(true)
		action(data.email, data.password, data.username)
		setLoading(false)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{!isLoginPage && (
				<div>
					<label htmlFor="username">Your Username</label>
					<TextInput
						placeholder="Your username"
						id="Username"
						error={
							validationErrors.username
								? validationErrors.username.message
								: null
						}
						{...register("username", {
							required: "This field is required",
						})}
					/>
				</div>
			)}
			<div>
				<label htmlFor="email">Your Email</label>
				<TextInput
					id="email"
					error={
						loginError.component === "email"
							? validationErrors.email
								? validationErrors.email.message
								: true
							: validationErrors.email
							? validationErrors.email.message
							: null
					}
					placeholder="Your email"
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "invalid email address",
						},
					})}
				/>
			</div>
			<div>
				<ForgotPasswordWrapper>
					<label htmlFor="password">Your Password</label>
					{isLoginPage && (
						<Link to="/reset-password">Forgot your password?</Link>
					)}
				</ForgotPasswordWrapper>
				<PasswordInput
					placeholder="Your password"
					error={
						loginError.component === "password"
							? validationErrors.password
								? validationErrors.password.message
								: true
							: validationErrors.password
							? validationErrors.password.message
							: null
					}
					id="password"
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 charaters long",
						},
					})}
				/>
			</div>
			<Button type="submit">{isLoginPage ? "Login" : "Sign Up"}</Button>
			{loginError && <div>{loginError.message}</div>}
		</form>
	)
}

export default LoginForm
//google sign up makes account with random username (user109281094800)

//check if the user already has an account and tries to sign up that it throws
//an error that can be displayed (or if tries to log in but no account found)

const ForgotPasswordWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`
