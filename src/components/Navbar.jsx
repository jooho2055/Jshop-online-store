import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import jshopLogo from '../assets/svg/jshopLogo.svg';
import { login, logout, onUserStateChange } from '../api/firebase';
import User from './User';

export default function Navbar() {
	const [user, setUser] = useState();

	useEffect(() => {
		onUserStateChange(setUser);
	}, []);

	// const handleLogin = () => {
	// 	login(); // then(user => setUser(user))
	// };

	// const handleLogout = () => {
	// 	logout();
	// };

	return (
		<header className='flex justify-between border-b border-gray-300 p-1'>
			<Link to={'/'} className='flex items-center text-2xl text-brand pl-2'>
				<img src={jshopLogo} alt='Jshop Logo' className='w-11 h-11' />
				<h1>Jshop</h1>
			</Link>
			<nav className='flex items-center gap-4 font-semibold pr-4'>
				<Link to={'/products'}>Products</Link>
				<Link to={'/carts'}>Carts</Link>
				<Link to={'/products/new'} className='text-2xl'>
					<BsFillPencilFill />
				</Link>
				{user && <User user={user} />}
				{!user && <button onClick={login}>Login</button>}
				{user && <button onClick={logout}>Logout</button>}
			</nav>
		</header>
	);
}
