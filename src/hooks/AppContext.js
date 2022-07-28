import { useState, useEffect, createContext, useRef } from "react"
import { useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import {
	onAuthStateChanged,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	provider,
} from "./firebase"
import {
	getProfileData,
	useCreateUserDoc,
	useLogOut,
	useUpdatePreferences,
} from "./auth"
import { currencyList } from "./constants.js"

const auth = getAuth()
const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loginError, setLoginError] = useState({ component: "", message: "" })
	const [preferences, setPreferences] = useState({
		sizePreference: "EU",
		currency: { name: "USD", rate: 1, symbol: "$" },
	})
	const [isAuthLoading, setIsAuthLoading] = useState(true)
	const [uid, setUid] = useState(null)
	const ref = useRef(false)

	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const {
		data: profile,
		isLoading: isProfileLoading,
		isError: isProfileError,
	} = useQuery(["profile", uid], () => getProfileData(uid), {
		enabled: !!uid,
	})
	const { mutateAsync: createUserDoc } = useCreateUserDoc()
	const { mutateAsync: logOut } = useLogOut()
	const { mutateAsync: updatePreferences } = useUpdatePreferences()

	const signUp = async (email, password, username) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			const uid = userCredential.user.uid
			await createUserDoc({ uid, email, username, preferences })
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
			await createUserDoc({ uid, email, preferences })
			navigate("/")
		} catch (e) {
			console.error(e)
		}
	}

	const signOut = async () => {
		await logOut()
		queryClient.invalidateQueries("profile")
		navigate("/")
	}

	useEffect(() => {
		if (auth) {
			const unsubscribe = onAuthStateChanged(auth, user => {
				if (user) {
					setUser(user)
					setUid(user.uid)
				} else {
					setUser(null)
					setUid(null)
				}
				setIsAuthLoading(false)
			})
			return unsubscribe
		}
	}, [auth])

	useEffect(() => {
		if (isAuthLoading) return
		if (ref.current) {
			if (profile) {
				updatePreferences({ uid, preferences })
				queryClient.invalidateQueries("profile")
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
			if (profile) {
				setPreferences(profile.preferences)
				localStorage.setItem("sizePreference", preferences.sizePreference)
				localStorage.setItem("currency", preferences.currency.name)
			} else if (savedSizes && savedCurrencyName) {
				setPreferences({ sizePreference: savedSizes, currency: savedCurrency })
			} else {
				localStorage.setItem("sizePreference", preferences.sizePreference)
				localStorage.setItem("currency", preferences.currency.name)
			}
		}
	}, [preferences, isAuthLoading, profile])

	const values = {
		user,
		isAuthLoading,
		uid,
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
