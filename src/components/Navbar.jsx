import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import jshopLogo from '../assets/svg/jshopLogo.svg';

export default function Navbar() {
	return (
		<header className='flex justify-between'>
			<Link to={'/'}>
				<img src={jshopLogo} alt='Jshop Logo' />
				<h1>Jshop</h1>
			</Link>
			<nav>
				<Link to={'/products'}>Products</Link>
				<Link to={'/carts'}>Carts</Link>
				<Link to={'/products/new'}>
					<BsFillPencilFill />
				</Link>
				<button>Login</button>
			</nav>
		</header>
	);
}
