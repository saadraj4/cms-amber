import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { fileToDataUrl } from '../utils/file';

const About = () => {
    const [description, setDescription] = useState('');
    const [imageEnabled, setImageEnabled] = useState(false);
    const [imageDataUrl, setImageDataUrl] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageUpload = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image size should be less than 5MB');
            return;
        }

        try {
            const dataUrl = await fileToDataUrl(file);
            setImageDataUrl(dataUrl);
            toast.success('Image uploaded successfully');
        } catch {
            toast.error('Failed to upload image');
        }
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            handleImageUpload(file);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const removeImage = () => {
        setImageDataUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.success('Image removed');
    };

    const handleSave = () => {
        toast.success('About saved');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">About</h1>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={6}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                            placeholder="Tell us about yourself..."
                        />
                        <div className="space-y-4">
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    id="imageEnabled"
                                    checked={imageEnabled}
                                    onChange={(e) => setImageEnabled(e.target.checked)}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                
                                <label htmlFor="imageEnabled" className="ml-2  text-sm font-medium text-gray-700">
                                    Add Profile Image
                                </label>
                            </div>

                            {imageEnabled && (
                                <div className="space-y-3">
                                    {imageDataUrl ? (
                                        <div className="relative">
                                            <div className="w-full h-60 bg-white rounded-lg border-2 border-gray-200 overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={imageDataUrl}
                                                    alt="Profile preview"
                                                    className="max-h-full max-w-full object-contain"
                                                    loading="lazy"
                                                    decoding="async"
                                                    style={{ imageRendering: 'auto' }}
                                                />
                                            </div>
                                            <button
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
                                                title="Remove image"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onDrop={handleDrop}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${isDragOver
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-gray-300 hover:border-gray-400'
                                                }`}
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileInputChange}
                                                className="hidden"
                                            />

                                            <div className="space-y-3">
                                                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {isDragOver ? 'Drop your image here' : 'Upload profile image'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Drag & drop or click to browse
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        PNG, JPG up to 5MB
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>



                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                    >
                        Save About
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;

