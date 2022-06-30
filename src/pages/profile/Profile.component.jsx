import styled from "styled-components/macro"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { Button, TextInput, NativeSelect } from "@mantine/core"
import Preferences from "../../components/preferences"
import { LoadingScreen } from "../../components/utils"
import AppContext from "../../hooks/AppContext"
import DeleteModal from "../../components/deleteModal/DeleteModal.component"
import { deleteAcc, updateProfile } from "../../hooks/auth"
import { getAuth } from "../../hooks/firebase"
import { useForm } from "react-hook-form"
import { getProfileListings } from "../../hooks/getData"
import { nanoid } from "nanoid"
import { updateListing, deleteListing } from "../../hooks/createDocs"
import { sizeChart } from "../../hooks/constants"
const auth = getAuth()

const Profile = () => {
	const {
		preferences: { currency, sizePreference },
		isLoggedIn,
		profile,
		isProfileLoading,
		isProfileError,
		signOut,
		user,
	} = useContext(AppContext)
	const [isDeleteOpened, setIsDeleteOpened] = useState(false)
	const [isUpdatingUsername, setIsUpdatingUsername] = useState(null)
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const uid = user?.uid //uid is undefined when you refresh
	const {
		data: listings,
		isLoading: isListingLoading,
		isError: isListingError,
	} = useQuery(["profileListings", uid], () => getProfileListings(uid), {
		enabled: !!uid,
	})

	const { mutate: updateUserMutation } = useMutation(updateProfile, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
		},
	})
	const { mutate: deleteUser } = useMutation(deleteAcc, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
		},
	})

	const { mutateAsync: deleteListingMutation } = useMutation(deleteListing)
	// call mutation which
	// invalidates porfile and product

	//add validation to update username
	//add error showing when
	const {
		handleSubmit: handleSubmitUsername,
		register: registerUsername,
		formState: { errors: errorsUsername },
	} = useForm({
		defaultValues: {
			username: profile?.username,
		},
	})
	const {
		handleSubmit: handleSubmitListing,
		register: registerListing,
		formState: { errors: errorsListing },
		reset,
	} = useForm()

	const formatPrice = sellingPrice => {
		let priceUSD
		if (currency.name === "USD") {
			priceUSD = sellingPrice
		} else if (currency.name === "EUR") {
			priceUSD = sellingPrice * 1.05
		} else {
			priceUSD = sellingPrice * 1.22
		}
		return priceUSD
	}
	const formatSize = selectedSize => {
		let sizeUS
		let sizeEU
		if (sizePreference === "US") {
			sizeUS = selectedSize
			sizeEU = sizeChart.find(size => size.sizeUS === sizeUS).sizeEU
		} else {
			sizeEU = selectedSize
			sizeUS = sizeChart.find(size => size.sizeEU === sizeEU).sizeUS
		}
		return {
			sizeUS,
			sizeEU,
		}
	}
	useEffect(() => {
		if (!isLoggedIn) {
			navigate("/login")
		}
	}, [])

	const deleteAccount = () => {
		const user = auth.currentUser
		deleteUser({ user })
		navigate("/")
	}
	const onSubmitUsername = data => {
		if (data.username === "" || data.username === profile.username) {
			setIsUpdatingUsername(false)
			return
		}
		updateUserMutation({ uid: auth.currentUser.uid, username: data.username })
		setIsUpdatingUsername(false)
	}

	const { mutateAsync: updateListingMutation } = useMutation(updateListing)

	const onSubmitListing = async (data, listing) => {
		if (
			data.sellingPrice === listing.price &&
			data.selectedSize === listing.size
		) {
			return
		}
		const sizeInfo = formatSize(data.selectedSize)
		const priceUSD = formatPrice(data.sellingPrice)
		await updateListingMutation({
			objectID: listing.objectID,
			uid,
			price: priceUSD,
			sizeInfo,
		})
		queryClient.invalidateQueries("profile")
		queryClient.invalidateQueries(`productDetails-${listing.urlKey}`)
		setEditMenu(false)
	}
	const sizesToDisplay = () => {
		let newSizes
		if (sizePreference === "EU") {
			newSizes = sizeChart.map(size => size.sizeEU)
		} else {
			newSizes = sizeChart.map(size => size.sizeUS)
		}
		return newSizes
	}
	const deleteListingFn = (objectID, urlKey) => {
		deleteListingMutation({ objectID, uid })
		queryClient.invalidateQueries("profile")
		queryClient.invalidateQueries(`productDetails-${urlKey}`)
	}
	const [editMenu, setEditMenu] = useState(false)

	if (isProfileLoading)
		return (
			<>
				<LoadingScreen />
			</>
		)
	//error component that says error while fetching please reload
	if (isProfileError) return <div>Error, please try again</div>

	return (
		profile && (
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
								<form onSubmit={handleSubmitUsername(onSubmitUsername)}>
									<h4>Username</h4>
									<TextInput
										placeholder={profile?.username}
										{...registerUsername("username")}
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
							<Preferences />
						</div>
					</Section>
					{isListingLoading ? (
						isListingError ? (
							<div>Error loading listings</div>
						) : (
							<div>Loading</div>
						)
					) : isListingError ? (
						<div>Error loading listings</div>
					) : (
						listings.length !== 0 && (
							<Section2>
								<h4>Your listings</h4>
								{listings.map(listing => (
									<Listing key={nanoid()}>
										<div>
											<img src={listing.thumbnail} alt={listing.title} />
										</div>
										<div>
											<Link to={`/sneakers/${listing.urlKey}`}>
												<p>{listing.title}</p>
											</Link>
											{editMenu === listing.urlKey ? (
												<div>
													<form
														onSubmit={handleSubmitListing(data =>
															onSubmitListing(data, {
																price: Math.floor(
																	listing.price * currency.rate
																),
																size:
																	sizePreference === "EU"
																		? listing.sizeInfo.sizeEU
																		: listing.sizeInfo.sizeUS,
																objectID: listing.objectID,
																urlKey: listing.urlKey,
															})
														)}
													>
														<TextInput
															defaultValue={Math.floor(
																listing.price * currency.rate
															)}
															{...registerListing("sellingPrice", {
																required: true,
																min: 20,
																max: 10000,
															})}
														/>
														<NativeSelect
															data={sizesToDisplay()}
															defaultValue={
																sizePreference === "EU"
																	? listing.sizeInfo.sizeEU
																	: listing.sizeInfo.sizeUS
															}
															rightSection={
																<InputRightSection>
																	{sizePreference}
																</InputRightSection>
															}
															rightSectionWidth={50}
															{...registerListing("selectedSize", {
																required: true,
															})}
														/>
														<Button type="submit">Apply changes</Button>
													</form>
													<Button
														onClick={() =>
															deleteListingFn(listing.objectID, listing.urlKey)
														}
													>
														Delete
													</Button>
													<Button onClick={() => setEditMenu(null)}>
														Cancel
													</Button>
												</div>
											) : (
												<div>
													<p>{Math.floor(listing.price * currency.rate)}</p>
													<p>
														{sizePreference === "EU"
															? listing.sizeInfo.sizeEU
															: listing.sizeInfo.sizeUS}
													</p>
													<Button
														onClick={() => {
															setEditMenu(listing.urlKey)
															reset()
														}}
													>
														Edit
													</Button>
												</div>
											)}
										</div>
									</Listing>
								))}
							</Section2>
						)
					)}
				</Main>
			</>
		)
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
const Listing = styled.div`
	display: flex;
	width: 750px;
	height: 75px;
	div {
		display: flex;
		gap: 10px;
	}
`
const InputRightSection = styled.div``
