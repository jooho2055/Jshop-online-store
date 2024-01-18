import React from 'react';

export default function Banner() {
	return (
		<section className='h-96 bg-yellow-900 relative font-mono rounded-lg mx-4 '>
			<div className='w-full h-full bg-cover bg-banner opacity-70 rounded-lg'></div>
			<div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
				<h2 className='text-5xl mt-3'>Discover Your Style</h2>
				<p className='text-2xl mt-5'>Unique Fashion, Exceptional Quality</p>
			</div>
		</section>
	);
}
