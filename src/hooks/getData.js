import {
	getDocs,
	collection,
	getFirestore,
	query,
	where,
	orderBy,
} from "./firebase"
import { index } from "./algolia"

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

export const getProduct = async urlKey => {
	try {
		const q = query(sneakersRef, where("urlKey", "==", urlKey))
		const fetchedData = await getDocs(q)
		return fetchedData.docs[0].data()
	} catch (e) {
		console.error(e)
	}
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
			hitsPerPage: 6,
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

	// export const getProfileData = async uid => {
	// 	try {
	// 		const docRef = doc(db, "users", uid)
	// 		const docSnapshot = await getDoc(docRef)
	// 		const data = await docSnapshot.data()
	// 		return data
	// 	} catch (e) {
	// 		console.error(e)
	// 	}
	// }
}
// export const searchProducts = async () => {
// 	try {
// 		const { hits } = await index.search(shoe, {
// 			attributesToRetrieve: [
// 				"title",
// 				"urlKey",
// 				"condition",
// 				"objectID",
// 				"sizes",
// 				"media",
// 			],
// 			hitsPerPage: 6,
// 		})
// 		const data = hits.filter(item => item.title !== title)
// 		return data
// 	} catch (e) {
// 		console.error(e)
// 	}
// }
