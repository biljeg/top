import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import styled from "styled-components/macro"
import { Button, TextInput } from "@mantine/core"

import { getAuth, sendPasswordResetEmail } from "../../hooks/firebase"
const auth = getAuth()

const ResetPassword = () => {
	const [status, setStatus] = useState({ message: null, isLoading: false })

	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors: validationErrors },
	} = useForm({
		defaultValues: {
			email: "",
		},
	})

	const onSubmit = async data => {
		try {
			setStatus(prevStatus => ({ ...prevStatus, isLoading: true }))
			await sendPasswordResetEmail(auth, data.email)
			setStatus({ message: "Email sent!", isLoading: false })
			navigate(-1)
		} catch (error) {
			const errorMessage = error.message
			setStatus({ message: "Error, please try again", isLoading: false })
		}
	}

	return (
		<div>
			<H1>Enter your email</H1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<TextInput
					label="email"
					id="email"
					error={validationErrors.email ? validationErrors.email.message : null}
					placeholder="Your email"
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "invalid email address",
						},
					})}
				/>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}

export default ResetPassword

const H1 = styled.h1`
	font-size: 2.8rem;
`
