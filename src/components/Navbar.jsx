import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPencilFill } from 'react-icons/bs';
import jshopLogo from '../assets/svg/jshopLogo.svg';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from './context/AuthContext';

export default function Navbar() {
	const { user, login, logout } = useAuthContext();

	// const handleLogin = () => {
	// 	login(); // then(user => setUser(user))
	// };

	// const handleLogout = () => {
	// 	logout();
	// };

	return (
		<header className='flex justify-between  border-gray-300 p-1'>
			<Link to={'/'} className='flex items-center text-3xl text-brand pl-4'>
				<img src={jshopLogo} alt='Jshop Logo' className='w-[3.5rem] h-[3.5rem]' />
				<h1 className='pl-1 font-mono pt-1 font-semibold'>Jshop</h1>
			</Link>
			<nav className='flex items-center gap-4 font-mono font-semibold pr-4'>
				<Link to={'/products'}>Products</Link>
				{user && <Link to={'/carts'}>Carts</Link>}
				{user && user.isAdmin && (
					<Link to={'/products/new'} className='text-2xl'>
						<BsFillPencilFill />
					</Link>
				)}

				{user && <User user={user} />}
				{!user && <Button text={'Login'} onClick={login} />}
				{user && <Button text={'Logout'} onClick={logout} />}
			</nav>
		</header>
	);
}
