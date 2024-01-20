import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function ProductDetail() {
	const {
		state: {
			product: { id, image, title, description, category, price, options },
		},
	} = useLocation();
	const [selected, setSelected] = useState(options && options[0]);
	const handleSelect = (e) => {
		setSelected(e.target.value);
	};

	const handleClick = (e) => {
		// add to cart
	};
	return (
		<>
			<p className='mx-12 mt-4 text-gray-700 text-2xl font-bold font-mono'>
				{category}
			</p>
			<section className='flex flex-col md:flex-row p-4 font-mono'>
				<img
					className='w-60 h-[55rem] px-4 basis-7/12 object-cover'
					src={image}
					alt={title}
				/>
				<div className='w-full flex flex-col basis-7/12 p-4'>
					<h2 className='text-3xl font-bold py-2 '>{title}</h2>
					<p className='text-2xl font-bold py-2 border-b border-gray-400'>
						$ {price}
					</p>
					<p className='py-4 text-lg'>{description}</p>
					<div className='flex items-center mb-24'>
						<label className='text-brand font-bold' htmlFor='select'>
							Option:
						</label>
						<select
							className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
							id='select'
							onChange={handleSelect}
							value={selected}
						>
							{options &&
								options.map((option, index) => (
									<option key={index}>{option}</option>
								))}
						</select>
					</div>
					<Button text={'Add To Cart'}></Button>
				</div>
			</section>
		</>
	);
}
