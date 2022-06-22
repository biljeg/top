import styled from "styled-components/macro"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Button, TextInput } from "@mantine/core"
import Preferences from "../../components/preferences"
import { LoadingScreen } from "../../components/utils"
import { AppContext } from "../../hooks/AppContext"
import DeleteModal from "../../components/deleteModal/DeleteModal.component"
import { deleteAcc, updateProfile } from "../../hooks/auth"
import { getAuth } from "../../hooks/firebase"
import { useForm } from "react-hook-form"
const auth = getAuth()

const Profile = () => {
	const { isLoggedIn, profile, isProfileLoading, isProfileError, signOut } =
		useContext(AppContext)
	const [isDeleteOpened, setIsDeleteOpened] = useState(false)
	const [isUpdatingUsername, setIsUpdatingUsername] = useState(false)
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const { mutate: updateUser } = useMutation(updateProfile, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
		},
	})
	const { mutate: deleteUser } = useMutation(deleteAcc, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
		},
	})
	//add validation to update username
	const { handleSubmit, register } = useForm({
		defaultValues: {
			username: profile?.username,
		},
	})
	// useEffect(() => {
	// 	if (!isLoggedIn) {
	// 		navigate("/login")
	// 	}
	// }, [])

	const deleteAccount = () => {
		const user = auth.currentUser
		deleteUser({ user })
		navigate("/")
	}
	const onSubmit = data => {
		if (data.username === "" || data.username === profile.username) {
			setIsUpdatingUsername(false)
			return
		}
		updateUser({ uid: auth.currentUser.uid, username: data.username })
		setIsUpdatingUsername(false)
	}
	if (isProfileLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	//error component that says error while fetching please reload
	if (isProfileError) return <div>Error, please try again</div>
	return (
		<>
			<DeleteModal
				isOpened={isDeleteOpened}
				setIsOpened={setIsDeleteOpened}
				action={deleteAccount}
			/>
			<Main>
				<Section>
					<div>
						<h3>Account details</h3>
						{isUpdatingUsername ? (
							// make component controlled via Controller
							// so you can make it have the default value of the username before
							<form onSubmit={handleSubmit(onSubmit)}>
								<h4>Username</h4>
								<TextInput
									placeholder={profile?.username}
									{...register("username")}
								/>
								<Button type="submit">Save changes</Button>
							</form>
						) : (
							<div>
								<h4>Username</h4>
								<p>{profile?.username}</p>
								<Button onClick={() => setIsUpdatingUsername(true)}>
									Update your username
								</Button>
							</div>
						)}
						<div>
							<h4>Email</h4>
							<p>{profile?.email}</p>
						</div>
						<Button onClick={signOut}>Sign out</Button>
						{/* fix overlay styles */}
						{/* <Button onClick={() => setIsDeleteOpened(true)}>
							Delete account
						</Button> */}
						<div>
							Reset password
							<Link to={"/reset-password"}>
								<Button>Reset password</Button>
							</Link>
						</div>
					</div>

					<div>
						<h3>Preferences</h3>
						{/* make it so preferences save to the account */}
						<Preferences />
					</div>
				</Section>
				<Section2>
					<h2>Listings</h2>
				</Section2>
			</Main>
		</>
	)
	//sign out button
}

export default Profile

const Main = styled.main`
	display: flex;
	flex-direction: column;
	gap: 50px;
`
const Section = styled.section`
	display: flex;
	justify-content: space-around;
`
const Section2 = styled.section`
	display: flex;
	justify-content: center;
`
