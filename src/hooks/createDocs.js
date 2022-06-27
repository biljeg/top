import {
	getDocs,
	getDoc,
	setDoc,
	collection,
	getFirestore,
	query,
	where,
	orderBy,
	doc,
} from "./firebase"

const db = getFirestore()

export const newListing = async ({ uid, objectID }) => {
	const userListingsRef = collection(db, "users", uid, "listings")
	const productListingsRef = collection(db, "sneakers", objectID, "listings")
	const prevListing = doc(db, "users", uid, "listings", objectID)
	if (prevListing.exists()) {
		return "Listing already exists"
	}
	await setDoc(userListingsRef, objectID)
}
//new doc in user profile under listings subcollection
//new doc in objectID under listings subcollection
//useMutation for all of this and it invalidates the profile
//profile page display listings data if it exists
//for each shoe display listings data if it exists
