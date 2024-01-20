import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
	const { id, image, title, category, price } = product;
	const navigate = useNavigate();

	return (
		<li
			onClick={() => {
				navigate(`/products/${id}`, { state: { product } });
			}}
			className='rounded-lg shadow-md overflow-hidden cursor-pointer //
		 font-mono tansition-all hover:scale-105'
		>
			<img className='w-full h-96 object-cover' src={image} alt={title} />
			<div className='mt-2 px-2 text-lg'>
				<h3 className='truncate'>{title}</h3>
				<p className='text-xl'>{`$ ${price}`}</p>
			</div>
			<p className='mb-2 px-2 text-gray-600'>{category}</p>
		</li>
	);
}
