import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCNyqzP9mUWGD54U49bpyhWXncDST9HvL4",
	authDomain: "top-dev-2c80e.firebaseapp.com",
	projectId: "top-dev-2c80e",
	storageBucket: "top-dev-2c80e.appspot.com",
	messagingSenderId: "807666166672",
	appId: "1:807666166672:web:01bd118e6e75ca0e7d6115",
}

const app = initializeApp(firebaseConfig)

export { getFirestore, collection, doc, setDoc }
