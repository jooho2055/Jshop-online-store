import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import jshopLogo from '../assets/svg/jshopLogo.svg';
import { login, logout, onUserStateChange } from '../api/firebase';

export default function Navbar() {
	const [user, setUser] = useState();

	useEffect(() => {
		onUserStateChange((user) => {
			console.log(user);
			setUser(user);
		});
	});

	const handleLogin = () => {
		login().then(setUser); // then(user => setUser(user))
	};

	const handleLogout = () => {
		logout().then(setUser);
	};

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
				{!user && <button onClick={handleLogin}>Login</button>}
				{user && <button onClick={handleLogout}>Logout</button>}
			</nav>
		</header>
	);
}
