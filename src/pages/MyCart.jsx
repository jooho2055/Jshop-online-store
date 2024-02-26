import React from 'react';
import { getCartProducts } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';

export default function MyCart() {
	const { uid } = useAuthContext();
	const { isLoading, data: products } = useQuery({
		queryKey: ['carts'],
		queryFn: () => getCartProducts(uid),
	});

	if (isLoading) return <p>Loading...</p>;

	const hasProducts = products && products.length > 0;
	const totalPrice =
		products &&
		products.reduce((prev, current) => {
			prev + parseInt(current.price) * current.quantity;
		}, 0);
	return (
		<section>
			<p>내 장바구니</p>
			{!hasProducts && <p>There is no product in your cart!</p>}
			{hasProducts && (
				<>
					<ul>
						{products &&
							products.map((product) => (
								<CartItem key={product.id} product={product} />
							))}
					</ul>
					<div>
						<PriceCard text='Total Price' price={totalPrice}></PriceCard>
					</div>
				</>
			)}
		</section>
	);
}
