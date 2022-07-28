import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "react-query"
import { useForm } from "react-hook-form"
import styled from "styled-components/macro"
import { Button, TextInput } from "@mantine/core"

import AppContext from "../../hooks/AppContext"
import { useDeleteAccount, useUpdateProfile } from "../../hooks/auth"
import { getAuth } from "../../hooks/firebase"
import { getProfileListings } from "../../hooks/api"
import Preferences from "../../components/preferences"
import { Content, LoadingScreen } from "../../components/utils"
import Modal from "../../components/modal"
import Listings from "../../components/listings"

const auth = getAuth()

const Profile = () => {
	const [isDeleteOpened, setIsDeleteOpened] = useState(false)
	const [isUpdatingUsername, setIsUpdatingUsername] = useState(null)
	const {
		user,
		profile,
		isProfileLoading,
		isProfileError,
		signOut,
		uid,
		isAuthLoading,
	} = useContext(AppContext)
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			username: profile?.username,
		},
	})
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	const {
		data: listings,
		isLoading: isListingLoading,
		isError: isListingError,
	} = useQuery(["profileListings", uid], () => getProfileListings(uid), {
		enabled: !!uid,
	})

	const { mutateAsync: updateProfile } = useUpdateProfile()
	const { mutateAsync: deleteAccount } = useDeleteAccount()

	const deleteProfile = async () => {
		const user = auth.currentUser
		await deleteAccount({ user })
		queryClient.invalidateQueries("profile")
		setIsDeleteOpened(false)
		navigate("/")
	}

	const onSubmit = async data => {
		if (data.username === "" || data.username === profile.username) {
			return setIsUpdatingUsername(false)
		}
		await updateProfile({
			uid: auth.currentUser.uid,
			username: data.username,
		})
		queryClient.invalidateQueries("profile")
		setIsUpdatingUsername(false)
	}

	useEffect(() => {
		if (isAuthLoading) return
		if (!user) {
			navigate("/login")
		}
	}, [isAuthLoading, user])

	if (isProfileLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	if (isProfileError) return <div>Error, please try again</div>

	return (
		profile && (
			<Content
				alignItems="flex-start"
				widthDesktop="min(90vw, 1400px)"
				widthTablet="90vw"
				widthMobile="95vw"
				minHeight="100vh"
			>
				<Modal isOpened={isDeleteOpened}>
					<DeleteModal>
						<H3>Are you sure you want to delete your account?</H3>
						<DeleteButtonContainer>
							<Button
								variant="outline"
								onClick={deleteProfile}
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
							>
								Yes
							</Button>

							<Button
								onClick={() => setIsDeleteOpened(false)}
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
								Cancel
							</Button>
						</DeleteButtonContainer>
					</DeleteModal>
				</Modal>
				<PageWrapper>
					<AccountDetailsContainer>
						<H2>Account details</H2>
						<AccountDetailsWrapper>
							<div>
								<Detail>
									{isUpdatingUsername ? (
										<form onSubmit={handleSubmit(onSubmit)}>
											<DetailHeader>Username</DetailHeader>
											<TextInput
												placeholder={profile?.username}
												{...register("username")}
											/>
											<Button
												variant="outline"
												type="submit"
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
											>
												Save changes
											</Button>
										</form>
									) : (
										<div>
											<DetailHeader>Username</DetailHeader>
											<DetailValue>{profile?.username}</DetailValue>
											<Button
												variant="outline"
												onClick={() => setIsUpdatingUsername(true)}
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
												style={{
													marginTop: "1rem",
												}}
											>
												Update username
											</Button>
										</div>
									)}
								</Detail>
								<Detail>
									<DetailHeader>Email</DetailHeader>
									<DetailValue>{profile?.email}</DetailValue>
								</Detail>
								<Detail>
									<DetailHeader>Sign out</DetailHeader>
									<Button
										variant="outline"
										onClick={signOut}
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
										style={{
											marginTop: "0.5rem",
										}}
									>
										Sign out
									</Button>
								</Detail>
							</div>
							<div>
								<Detail>
									<DetailHeader>Password</DetailHeader>
									<Link to={"/reset-password"}>
										<Button
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
												marginTop: "0.5rem",
											}}
											type="submit"
										>
											Reset password
										</Button>
									</Link>
								</Detail>

								<Detail>
									<DetailHeader>Delete account</DetailHeader>
									<Button
										onClick={() => setIsDeleteOpened(true)}
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
											marginTop: "0.5rem",
										}}
										type="submit"
									>
										Delete account
									</Button>
								</Detail>
							</div>
						</AccountDetailsWrapper>
					</AccountDetailsContainer>
					<PreferencesContainer>
						<H2>Preferences</H2>
						<PreferencesWrapper>
							<Preferences isProfilePage />
						</PreferencesWrapper>
					</PreferencesContainer>
					{isListingLoading ? (
						<div>Loading</div>
					) : isListingError ? (
						<div>Error loading listings</div>
					) : (
						listings.length !== 0 && (
							<ListingsContainer>
								<H2>My listings</H2>
								<div>
									<Listings listings={listings} />
								</div>
							</ListingsContainer>
						)
					)}
				</PageWrapper>
			</Content>
		)
	)
}

export default Profile

const H2 = styled.h2`
	font-size: 2rem;
	margin-bottom: 1rem;
	line-height: 1.1;
	color: ${props => props.theme.colors.veryDarkGray};
	@media (max-width: 750px) {
		font-size: 1.8rem;
	}
`

const DetailHeader = styled.h3`
	font-size: 1.4rem;
	margin-bottom: 0.4rem;
	line-height: 1.1;
	font-weight: 600;
	color: ${props => props.theme.colors.veryDarkGray};
	@media (max-width: 750px) {
		font-size: 1.2rem;
	}
`

const DetailValue = styled.p`
	font-size: 1.4rem;
	line-height: 1.1;
	color: ${props => props.theme.colors.veryDarkGray};
	@media (max-width: 750px) {
		font-size: 1.2rem;
	}
`

const PageWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	@media (min-width: 800px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: 1250px) {
		grid-template-columns: repeat(3, 1fr);
	}
`

const AccountDetailsContainer = styled.div`
	@media (min-width: 1250px) {
		margin-right: 3rem;
	}
`

const PreferencesContainer = styled.div`
	margin-top: 1.5rem;
	@media (min-width: 800px) {
		margin-top: 0;
	}
	@media (min-width: 1250px) {
		margin-inline: 3rem;
		margin-top: 0;
	}
`

const ListingsContainer = styled.div`
	margin-top: 1.5rem;
	@media (min-width: 1250px) {
		margin-top: 0;
	}
`

const AccountDetailsWrapper = styled.div`
	display: flex;
	gap: 4rem;
`

const PreferencesWrapper = styled.div`
	display: flex;
	gap: 2rem;
`

const Detail = styled.div`
	margin-block: 1rem;
`

//MODAL STYLES

const DeleteModal = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	max-width: 340px;
	padding: 16px 16px 24px 16px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: ${props => props.theme.colors.white};
	border-radius: 2px;
	border: 1px solid ${props => props.theme.colors.black};
	z-index: 3;
	border-radius: 2px;
	gap: 1rem;
`

const DeleteButtonContainer = styled.div`
	display: flex;
	gap: 2rem;
`

const H3 = styled.h3`
	font-size: 1.2rem;
	line-height: 1.1;
	color: ${props => props.theme.colors.veryDarkGray};
	margin-top: 0.5rem;
	margin-bottom: 0.5rem;
`
