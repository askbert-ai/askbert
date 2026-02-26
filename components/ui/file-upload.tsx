'use client'
import { useContentCopilot } from '@/app/content-copilot/_store/ContentCopilotStore';
import { Image as ImageIcon, Video as VideoIcon, X } from 'lucide-react';
import Image from 'next/image';
import React, { DragEvent, useRef, useState } from 'react';

const UploadComponent: React.FC = () => {
	const [isDragging, setIsDragging] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const updateDisabledNext = useContentCopilot((state) => state.updateDisabledNext)
	const { formData, updateData } = useContentCopilot()
	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = () => setIsDragging(false);

	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		const files = e.dataTransfer.files;
		if (files && files.length > 0) {
			updateData({ file: files[0] })
			updateDisabledNext(false)
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const files = e.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			const maxSize = 10 * 1024 * 1024;
			if (file && file.size > maxSize) {
				alert("File size is too large! Maximum limit is 10MB.");
				e.target.value = ""; // Reset input
				return;
			}
			updateData({ file: files[0] })
			updateDisabledNext(false)
		}
	};

	const removeFile = () => {
		updateData({ file: null })
		updateDisabledNext(true)
	};

	const openFileDialog = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	// If a file is selected, show the preview
	if (formData.file) {
		const isImage = formData.file.type.startsWith('image/');
		return (
			<div
				className={`min-w-full mx-auto justify-items-center border-2 border-dashed rounded-xl transition duration-300 border-primary bg-primary/10`}
			>
				<div className="relative w-fit">
					{isImage ? (
						<Image
							src={URL.createObjectURL(formData.file)}
							alt="Preview"
							className="max-h-[556] w-full object-contain rounded-lg"
							width={500}
							height={500}
						// onLoad={() => formData.file ? URL.revokeObjectURL(URL.createObjectURL(formData.file)) : ''} // Free memory
						/>
					) : (
						<div className="max-h-[556] flex items-center justify-center bg-gray-100 rounded-lg">
							<video controls className="w-full max-h-[556] object-contain">
								<source src={URL.createObjectURL(formData.file)} type={formData.file.type} />
								Browser Video Preview Not Available.
							</video>
						</div>
					)}
					<button
						onClick={removeFile}
						className="absolute bottom-3 justify-self-end right-3 bg-gray-800 bg-opacity-65 hover:bg-gray-700 text-white text-xs font-semibold py-1.5 px-3 rounded-md flex items-center shadow-md"
					>
						<X className="w-3 h-3 mr-1" />
						Remove
					</button>
				</div>

			</div>
		);
	}

	return (
		<div
			className={`min-w-full py-[130] mx-auto p-8 border-2 border-dashed rounded-xl transition duration-300 ${isDragging
				? 'border-primary bg-primary'
				: 'border-primary bg-primary/10'
				}`}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<input
				type="file"
				ref={fileInputRef}
				className="hidden"
				onChange={handleFileChange}
				accept="image/*,video/*"
			/>
			<div className="flex flex-col text-center">
				<Image
					src="/icon/cloud-upload.png"
					alt="Askbert.ai"
					width={128}
					height={128}
					className='mx-auto'
				/>
				<div className='hidden md:inline justify-center'>
					<p className="mt-2 text-sm text-gray-500">
						Drag and drop your photo or video here, or click to
					</p>
					<p className="text-sm text-gray-500">
						browse files from your computer.
					</p>

				</div>
				<div className='md:hidden inline'>
					<p className="mt-2 text-sm text-gray-500">
						Choose your asset to upload.
					</p>
				</div>
				<div className="mt-4 flex justify-center space-x-4">
					<button
						onClick={() => {
							if (fileInputRef.current) {
								fileInputRef.current.accept = 'image/*';
								openFileDialog();
							}
						}}
						className="flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200"
					>
						<ImageIcon className="w-4 h-4 mr-2" />
						Photo
					</button>
					<button
						onClick={() => {
							if (fileInputRef.current) {
								fileInputRef.current.accept = 'video/*';
								openFileDialog();
							}
						}}
						className="flex items-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200"
					>
						<VideoIcon className="w-4 h-4 mr-2" />
						Video
					</button>
				</div>
			</div>
		</div>
	);
};

export default UploadComponent;
