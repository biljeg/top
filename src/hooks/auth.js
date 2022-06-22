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

const db = getFirestore()
const auth = getAuth()

const makeUsername = () => {
	const rand = Math.floor(Math.random() * 100000)
	return `user${rand}`
}

export const createUserDoc = async ({
	uid,
	email,
	username = makeUsername(),
}) => {
	const docRef = doc(db, "users", uid)
	const docSnapshot = await getDoc(docRef)
	if (docSnapshot._document) return

	await setDoc(docRef, {
		uid: uid,
		email: email,
		username: username,
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

export const updateProfile = async ({ uid, username }) => {
	try {
		const docRef = doc(db, "users", uid)
		await updateDoc(docRef, {
			username,
		})
	} catch (e) {
		console.error(e)
	}
}

export const logOut = async () => {
	await signOut(auth)
}

export const deleteAcc = async ({ user }) => {
	const uid = user.uid
	const docRef = doc(db, "users", uid)
	await deleteUser(user)
	await deleteDoc(docRef)
}
