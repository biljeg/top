import { initializeApp } from "firebase/app"
import {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDoc,
	getDocs,
	where,
	orderBy,
	limit,
	query,
	deleteDoc,
	updateDoc,
	serverTimestamp,
} from "firebase/firestore/lite"
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	sendPasswordResetEmail,
	deleteUser,
} from "firebase/auth"
import { getFunctions, httpsCallable } from "firebase/functions"

const firebaseConfig = {
	apiKey: "AIzaSyCNyqzP9mUWGD54U49bpyhWXncDST9HvL4",
	authDomain: "top-dev-2c80e.firebaseapp.com",
	projectId: "top-dev-2c80e",
	storageBucket: "top-dev-2c80e.appspot.com",
	messagingSenderId: "807666166672",
	appId: "1:807666166672:web:01bd118e6e75ca0e7d6115",
}

initializeApp(firebaseConfig)
const provider = new GoogleAuthProvider()

export {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDoc,
	getDocs,
	where,
	orderBy,
	limit,
	query,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	provider,
	signInWithPopup,
	signOut,
	sendPasswordResetEmail,
	deleteUser,
	deleteDoc,
	updateDoc,
	getFunctions,
	httpsCallable,
	serverTimestamp,
}
