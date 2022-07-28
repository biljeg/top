import styled from "styled-components/macro"
import { useForm } from "react-hook-form"
import { TextInput, Button, PasswordInput } from "@mantine/core"
import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { TailSpin } from "react-loading-icons"

import AppContext from "../../hooks/AppContext"

const LoginForm = ({ isLoginPage, action }) => {
	const [isLoading, setIsLoading] = useState(false)
	const { loginError } = useContext(AppContext)
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

	useEffect(() => {
		if (isLoginPage) {
			unregister("username")
		}
	}, [isLoginPage])

	const onSubmit = async data => {
		setIsLoading(true)
		await action(data.email, data.password, data.username)
		setIsLoading(false)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			{!isLoginPage && (
				<InputContainer>
					<LabelContainer>
						<label htmlFor="username">Your Username</label>
					</LabelContainer>
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
				</InputContainer>
			)}
			<InputContainer>
				<LabelContainer>
					<label htmlFor="email">Your Email</label>
				</LabelContainer>
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
							message: "Invalid email address",
						},
					})}
				/>
			</InputContainer>
			<InputContainer noMargin>
				<LabelContainer>
					<label htmlFor="password">Your Password</label>
					{isLoginPage && (
						<Link to="/reset-password">
							<ForgotPassword>Forgot your password?</ForgotPassword>
						</Link>
					)}
				</LabelContainer>
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
			</InputContainer>
			<Button
				uppercase
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
				style={{
					marginTop: "3rem",
				}}
				type="submit"
			>
				{isLoading ? (
					<TailSpin height="25px" width="25px" stroke="#fff" />
				) : isLoginPage ? (
					"Login"
				) : (
					"Register"
				)}
			</Button>
			{loginError && <ErrorMessage>{loginError.message}</ErrorMessage>}
		</Form>
	)
}

export default LoginForm

const Form = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
`

const LabelContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 0.5rem;
	font-size: 1.2rem;
`

const ForgotPassword = styled.p`
	font-size: 1rem;
	&:hover {
		text-decoration: underline;
	}
`

const InputContainer = styled.div`
	margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "1.5rem")};
`

const ErrorMessage = styled.p`
	margin-top: 0.5rem;
	font-size: 1.2rem;
	color: #f03e3e;
`
