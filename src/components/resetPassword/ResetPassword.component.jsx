import { useState } from "react"
import styled from "styled-components/macro"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
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
			{
				/* say check if you have account with this email?*/
			}
		}
	}

	return (
		<div>
			<h1>Enter your email</h1>
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
				{/* if is loading, set button's content to 3 dots loading */}
				{/* if the action is successful, display green success text */}
				{/* if the action is with error, display the error or 
        please try again in red */}
				<Button type="submit">Submit</Button>
			</form>
		</div>
	)
}

export default ResetPassword
