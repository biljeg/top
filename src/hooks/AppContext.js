import { useState, useEffect, createContext, useRef } from "react"
import {
	onAuthStateChanged,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	provider,
} from "./firebase"
import { useMutation } from "react-query"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient } from "react-query"
import { getProfileData, createUserDoc, logOut } from "./auth"

const auth = getAuth()
export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		user: null,
		isLoggedIn: false,
	})
	//update preferences so it is an object with rate
	//update all the places where it is needed to show dynamic price
	const [loginError, setLoginError] = useState({ component: "", message: "" })
	const [preferences, setPreferences] = useState({
		currency: { name: "USD", rate: 1, symbol: "$" },
		country: "United States",
	})
	const ref = useRef(false)
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const uid = userData.user?.uid
	const {
		data: profile,
		isLoading: isProfileLoading,
		isError: isProfileError,
	} = useQuery(["profile", uid], () => getProfileData(uid), {
		enabled: !!uid,
	})

	const { mutate: createNewProfile } = useMutation(createUserDoc)
	const { mutate: mutateLogOut } = useMutation(logOut, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
		},
	})
	const signOut = async () => {
		await mutateLogOut()
		navigate("/")
	}

	const signUp = async (email, password, username) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const uid = userCredential.user.uid
			await createNewProfile({ uid, email, username })
			navigate("/")
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				setLoginError({
					component: "email",
					message: "Email is already in use",
				})
			}
		}
	}
	const logIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password)
			navigate("/")
		} catch (error) {
			if (error.code === "auth/user-not-found") {
				setLoginError({ component: "email", message: "Account not found" })
			}
			if (error.code === "auth/wrong-password") {
				setLoginError({ component: "password", message: "Wrong password" })
			}
		}
	}
	const googleSignIn = async () => {
		try {
			const userCredential = await signInWithPopup(auth, provider)
			const uid = userCredential.user.uid
			const email = userCredential.user.email
			await createNewProfile({ uid, email })
			navigate("/")
		} catch (e) {
			console.error(e)
		}
	}

	Storage.prototype.setObject = function (key, value) {
		this.setItem(key, JSON.stringify(value))
	}
	Storage.prototype.getObject = function (key) {
		const value = this.getItem(key)
		return value && JSON.parse(value)
	}

	useEffect(() => {
		onAuthStateChanged(auth, user => {
			if (user) {
				setUserData({ user: user, isLoggedIn: true })
			} else {
				setUserData({ user: null, isLoggedIn: false })
			}
		})
	}, [])
	useEffect(() => {
		if (ref.current) {
			localStorage.setItem("country", preferences.country)
			localStorage.setObject("currency", preferences.currency)
		} else {
			ref.current = true
			const savedCountry = localStorage.getItem("country")
			const savedCurrency = localStorage.getObject("currency")
			if (!savedCountry || !savedCurrency) {
				localStorage.setItem("country", preferences.country)
				localStorage.setObject("currency", preferences.currency)
			} else {
				setPreferences({ country: savedCountry, currency: savedCurrency })
			}
		}
	}, [preferences])

	const values = {
		...userData,
		preferences,
		setPreferences,
		profile,
		isProfileLoading,
		isProfileError,
		signUp,
		logIn,
		googleSignIn,
		signOut,
		loginError,
	}
	return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}

export default AppContextProvider
