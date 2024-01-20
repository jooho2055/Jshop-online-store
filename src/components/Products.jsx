import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

export default function Products() {
	const {
		isLoading,
		error,
		data: products,
	} = useQuery({ queryKey: ['products'], queryFn: () => getProducts() });

	return (
		<>
			{isLoading && <p>Loading...</p>}
			{error && <p>{error.message}</p>}
			<ul className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4'>
				{products &&
					products?.map((product) => (
						<ProductCard key={product.id} product={product}></ProductCard>
					))}
			</ul>
		</>
	);
}
