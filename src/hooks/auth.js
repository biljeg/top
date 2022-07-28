import {
	getFirestore,
	doc,
	setDoc,
	getDoc,
	getAuth,
	signOut,
	deleteUser,
	deleteDoc,
	updateDoc,
} from "./firebase"
import { useMutation } from "react-query"

const db = getFirestore()
const auth = getAuth()

const makeUsername = () => {
	const rand = Math.floor(Math.random() * 100000)
	return `user${rand}`
}

const createUserDoc = async ({
	uid,
	email,
	username = makeUsername(),
	preferences,
}) => {
	const docRef = doc(db, "users", uid)
	const docSnapshot = await getDoc(docRef)
	if (docSnapshot.exists()) return

	await setDoc(docRef, {
		uid: uid,
		email: email,
		username: username,
		preferences: preferences,
	})
}

export const getProfileData = async uid => {
	try {
		const docRef = doc(db, "users", uid)
		const docSnapshot = await getDoc(docRef)
		const data = await docSnapshot.data()
		return data
	} catch (e) {
		console.error(e)
	}
}

const updateProfile = async ({ uid, username }) => {
	try {
		const docRef = doc(db, "users", uid)
		await updateDoc(docRef, {
			username,
		})
	} catch (e) {
		console.error(e)
	}
}

const updatePreferences = async ({ uid, preferences }) => {
	try {
		const docRef = doc(db, "users", uid)
		await updateDoc(docRef, {
			preferences: preferences,
		})
	} catch (e) {
		console.error(e)
	}
}

const logOut = async () => {
	await signOut(auth)
}

const deleteAccount = async ({ user }) => {
	const uid = user.uid
	const docRef = doc(db, "users", uid)
	await deleteUser(user)
	await deleteDoc(docRef)
}

export const useDeleteAccount = () => {
	return useMutation(deleteAccount)
}

export const useUpdateProfile = () => {
	return useMutation(updateProfile)
}

export const useCreateUserDoc = () => {
	return useMutation(createUserDoc)
}

export const useUpdatePreferences = () => {
	return useMutation(updatePreferences)
}

export const useLogOut = () => {
	return useMutation(logOut)
}
