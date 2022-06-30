import {
	getDocs,
	getDoc,
	setDoc,
	collection,
	deleteDoc,
	updateDoc,
	getFirestore,
	doc,
	serverTimestamp,
} from "./firebase"

const db = getFirestore()

export const newListing = async ({
	uid,
	objectID,
	sizeInfo,
	data,
	priceUSD,
}) => {
	const prevListing = doc(db, "users", uid, "listings", objectID)
	const prevListingSnap = await getDoc(prevListing)
	if (prevListingSnap.exists()) {
		return "Listing already exists"
	}
	await setDoc(doc(db, "users", uid, "listings", objectID), {
		timestamp: serverTimestamp(),
		title: data.title,
		thumbnail: data.media.smallImageUrl,
		sizeInfo,
		urlKey: data.urlKey,
		price: priceUSD,
		objectID,
	})
	await setDoc(doc(db, "sneakers", objectID, "listings", uid), {
		timestamp: serverTimestamp(),
		title: data.title,
		thumbnail: data.media.smallImageUrl,
		objectID,
		sizeInfo,
		price: priceUSD,
		uid,
	})
	return "Listing created!"
}

export const updateListing = async ({ objectID, uid, price, sizeInfo }) => {
	const userDocRef = doc(db, "users", uid, "listings", objectID)
	const productDocRef = doc(db, "sneakers", objectID, "listings", uid)
	await updateDoc(userDocRef, {
		price,
		sizeInfo,
	})
	await updateDoc(productDocRef, {
		price,
		sizeInfo,
	})
}

export const deleteListing = async ({ objectID, uid }) => {
	const userDocRef = doc(db, "users", uid, "listings", objectID)
	const productDocRef = doc(db, "sneakers", objectID, "listings", uid)
	await deleteDoc(userDocRef)
	await deleteDoc(productDocRef)
}

// deletion - delete listing in profile and the product
// invalidate both queries
