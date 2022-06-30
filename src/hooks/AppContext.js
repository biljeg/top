import { useState, useEffect, createContext, useRef } from "react"
import {
	onAuthStateChanged,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	provider,
} from "./firebase"
import { useNavigate } from "react-router-dom"
import { useQuery, useQueryClient, useMutation } from "react-query"
import {
	getProfileData,
	createUserDoc,
	logOut,
	updatePreferences,
} from "./auth"
import { currencyList } from "../components/preferences"

const auth = getAuth()
const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		user: null,
		isLoggedIn: false,
	})
	const [loginError, setLoginError] = useState({ component: "", message: "" })
	const [preferences, setPreferences] = useState({
		currency: { name: "USD", rate: 1, symbol: "$" },
		sizePreference: "EU",
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
	}) // this part fails as well as auth.js line 42

	const { mutate: createNewProfile } = useMutation(createUserDoc)
	const { mutate: mutateLogOut } = useMutation(logOut, {
		onSuccess: () => {
			queryClient.invalidateQueries("profile")
		},
	})

	const { mutate: updatePrefMutation } = useMutation(updatePreferences)

	const signUp = async (email, password, username) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const uid = userCredential.user.uid
			await createNewProfile({ uid, email, username, preferences })
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
			await createNewProfile({ uid, email, preferences })
			navigate("/")
		} catch (e) {
			console.error(e)
		}
	}
	const signOut = async () => {
		await mutateLogOut()
		navigate("/")
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
			if (profile) {
				updatePrefMutation({ uid: uid, preferences: preferences })
			}
			localStorage.setItem("sizePreference", preferences.sizePreference)
			localStorage.setItem("currency", preferences.currency.name)
		} else {
			ref.current = true
			const savedSizes = localStorage.getItem("sizePreference")
			const savedCurrencyName = localStorage.getItem("currency")
			const savedCurrency = currencyList.find(
				item => item.name === savedCurrencyName
			)
			if (!savedSizes || !savedCurrencyName) {
				localStorage.setItem("sizePreference", preferences.sizePreference)
				localStorage.setItem("currency", preferences.currency.name)
			} else {
				setPreferences({ sizePreference: savedSizes, currency: savedCurrency })
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

export default AppContext
