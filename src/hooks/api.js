import {
	getFirestore,
	doc,
	collection,
	getDocs,
	query,
	where,
	getDoc,
	setDoc,
	deleteDoc,
	updateDoc,
	serverTimestamp,
} from "./firebase"
import { index } from "./initServices"
import { useQuery, useMutation } from "react-query"

const db = getFirestore()
const featuredRef = collection(db, "featuredSneakers")
const sneakersRef = collection(db, "sneakers")

export const getFeaturedItems = async () => {
	try {
		const q = query(featuredRef)
		const fetchedData = await getDocs(q)
		return fetchedData.docs.map(doc => doc.data())
	} catch (e) {
		console.error(e)
	}
}

const fetchProduct = async urlKey => {
	try {
		const q = query(sneakersRef, where("urlKey", "==", urlKey))
		const fetchedData = await getDocs(q)
		return fetchedData.docs[0].data()
	} catch (e) {
		console.error(e)
	}
}

export const useProductDetails = urlKey => {
	return useQuery([`productDetails-${urlKey}`, urlKey], () =>
		fetchProduct(urlKey)
	)
}

export const getRelatedProducts = async (shoe, title) => {
	try {
		const { hits } = await index.search(shoe, {
			attributesToRetrieve: [
				"title",
				"urlKey",
				"condition",
				"objectID",
				"sizes",
				"media",
				"market",
			],
			hitsPerPage: 7,
		})
		const data = hits.filter(item => item.title !== title)
		return data
	} catch (e) {
		console.error(e)
	}
}

export const getProfileListings = async uid => {
	try {
		const colRef = collection(db, "users", uid, "listings")
		const dataSnapshot = await getDocs(colRef)
		const data = []
		dataSnapshot.forEach(doc => {
			data.push(doc.data())
		})
		return data
	} catch (e) {
		console.error(e)
	}
}

export const getProductListing = async (objectID, uid) => {
	try {
		const colRef = collection(db, "sneakers", objectID, "listings")
		const dataSnapshot = await getDocs(colRef)
		let listing
		dataSnapshot.forEach(doc => {
			const data = []
			data.push(doc.data())
			listing = data.find(listing => listing.uid === uid)
		})
		return listing
	} catch (e) {
		console.error(e)
	}
}

const newListing = async ({ uid, objectID, sizeInfo, data, priceUSD }) => {
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
		uid,
	})
	await setDoc(doc(db, "sneakers", objectID, "listings", uid), {
		timestamp: serverTimestamp(),
		title: data.title,
		thumbnail: data.media.smallImageUrl,
		objectID,
		sizeInfo,
		price: priceUSD,
		urlKey: data.urlKey,
		uid,
	})
	return "Listing created!"
}

const updateListing = async ({ objectID, uid, price, sizeInfo }) => {
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

const deleteListing = async ({ objectID, uid }) => {
	const userDocRef = doc(db, "users", uid, "listings", objectID)
	const productDocRef = doc(db, "sneakers", objectID, "listings", uid)
	await deleteDoc(userDocRef)
	await deleteDoc(productDocRef)
}

export const useUpdateListing = () => {
	return useMutation(updateListing)
}

export const useDeleteListing = () => {
	return useMutation(deleteListing)
}

export const useNewListing = () => {
	return useMutation(newListing)
}
