import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';

export default function NewProducts() {
	const [product, setProduct] = useState({});
	const [file, setFile] = useState();
	const [previewImgUrl, setPreviewImgUrl] = useState();

	const [isUploading, setIsUploading] = useState(false);
	const [success, setSuccess] = useState();

	const [formKey, setFormKey] = useState(Date.now());

	const resetForm = () => {
		// In order to reset input form for file, Once the data is changed,
		// form will rerender with empty value
		setFormKey(Date.now());
	};

	const handleChange = (e) => {
		const { name, value, files } = e.target;

		if (name === 'file') {
			if (files.length > 0) {
				const newFile = files[0];
				setFile(newFile);
				setPreviewImgUrl(URL.createObjectURL(newFile));
				return;
			}
		}

		setProduct((product) => ({ ...product, [name]: value })); // 입력폼에서 변경이 발생한 이름의 키의 value 를 할당해줌
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// add a photo of a product to cloudinary and get url
		// add the new product in firebase

		setIsUploading(true);

		uploadImage(file)
			.then((url) => {
				addNewProduct(product, url).then(() => {
					setSuccess('✅ The Product Has Been Successfully Uploaded!');
					setTimeout(() => {
						setSuccess(null);
					}, 4000);
				});
			})
			.finally(() => {
				setIsUploading(false);
				setProduct({});
				setPreviewImgUrl();
				resetForm({});
			});
	};

	return (
		<section className='w-full text-center font-mono'>
			<h2 className='text-2xl font-bold my-5'>New Product Entry</h2>
			{success && <p className='my-3 text-xl'>{success}</p>}
			{previewImgUrl && (
				<img className='w-96 mx-auto mb-3' src={previewImgUrl} alt='local file' />
			)}
			<form className='flex flex-col px-12 mb-10' onSubmit={handleSubmit}>
				<input
					key={formKey}
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
					className='mb-4'
					type='text'
					name='options'
					value={product.options ?? ''}
					placeholder='Options (separated by commas)'
					required
					onChange={handleChange}
				/>
				<Button
					text={isUploading ? 'Uploading...' : 'Add Product'}
					disabled={isUploading}
				/>
			</form>
		</section>
	);
}
