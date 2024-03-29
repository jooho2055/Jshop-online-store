import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

provider.setCustomParameters({ prompt: 'select_account' });

export function login() {
	signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
	signOut(auth).catch(console.error);
}

export function onUserStateChange(callback) {
	onAuthStateChanged(auth, async (user) => {
		// 1. if user exist
		const updatedUser = user ? await adminUser(user) : null;
		console.log(updatedUser);
		callback(updatedUser);
	});
}

// 2. check if user is admin or not [firebase holds admins info]
// 3. {...user, isAdmin: true / false }
async function adminUser(user) {
	return get(ref(database, 'admins')) //
		.then((snapshot) => {
			if (snapshot.exists()) {
				const admins = snapshot.val();
				const isAdmin = admins.includes(user.uid);
				return { ...user, isAdmin };
			}
			return user; // if not admin, just return user info
		});
}

export async function addNewProduct(product, imageUrl) {
	const id = uuid();

	return set(ref(database, `products/${id}`), {
		...product,
		id,
		price: product.price,
		image: imageUrl,
		options: product.options.split(','),
	});
}

export async function getProducts() {
	return get(ref(database, 'products')).then((snapshot) => {
		if (snapshot.exists()) {
			return Object.values(snapshot.val());
		}

		return []; // if there is no snapshots
	});
}

export async function getCartProducts(userId) {
	return get(ref(database, `carts/${userId}`)).then((snapshot) => {
		const items = snapshot.val() || {};
		console.log(items);
		return Object.values(items);
	});
}

export async function addOrUpdateToCart(userId, product) {
	return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, product) {
	return remove(ref(database, `carts/${userId}/${product.id}`));
}
