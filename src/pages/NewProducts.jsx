import React, { useState } from 'react';
import Button from '../components/ui/Button';

export default function NewProducts() {
	const [product, setProduct] = useState({});
	const [file, setFile] = useState();

	const handleChange = (e) => {
		const { name, value, files } = e.target;
		if (name === 'file') {
			setFile(files && files[0]);
			return;
		}
		setProduct((product) => ({ ...product, [name]: value })); // 입력폼에서 변경이 발생한 이름의 키의 value 를 할당해줌
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// add a photo of a product to cloudinary and get url
		// add the new product in firebase
	};

	return (
		<section>
			{file && <img src={URL.createObjectURL(file)} alt='local file' />}
			<form onSubmit={handleSubmit}>
				<input
					type='file' //
					accept='image/*'
					name='file'
					required
					onChange={handleChange}
				/>
				<input
					type='text'
					name='title'
					value={product.title ?? ''}
					placeholder='Product Name'
					required
					onChange={handleChange}
				/>
				<input
					type='number'
					name='price'
					value={product.price ?? ''}
					placeholder='Price'
					required
					onChange={handleChange}
				/>
				<input
					type='text'
					name='category'
					value={product.category ?? ''}
					placeholder='Category'
					required
					onChange={handleChange}
				/>
				<input
					type='text'
					name='description'
					value={product.description ?? ''}
					placeholder='Description'
					required
					onChange={handleChange}
				/>
				<input
					type='text'
					name='options'
					value={product.options ?? ''}
					placeholder='Options (separated by commas)'
					required
					onChange={handleChange}
				/>
				<Button text={'Add Product'} />
			</form>
		</section>
	);
}
