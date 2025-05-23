"use client";
import React, {useState, useRef,} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {
    FaImage,
    FaCheck,
    FaTimes,
    FaArrowRight
} from 'react-icons/fa';
import Image from "next/image";
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import {Button} from "@/components/ui/button";
import {create_new_blog} from "@/server/blog";
import {TBlog} from "@/types/blog";
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});


type FormValues = {
    title:string;
    content:string;
    blogTags:string;
};


const AddBlogForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const mdParser = new MarkdownIt(/* Markdown-it options */);
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            title:"",
            content:"",
            blogTags:"",
        }
    });


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            validateAndSetImage(file);
        }
    };

    const validateAndSetImage = (file: File) => {
        // Check file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            toast.error('Please select a valid image file (JPEG, PNG, GIF, WEBP)');
            return;
        }

        // Check file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Image size should be less than 10MB');
            return;
        }

        setSelectedImage(file);
        // Create preview URL
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetImage(e.dataTransfer.files[0]);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const onSubmit = async (data: FormValues) => {
        setIsLoading(true);
        const id = toast.loading('Verifying product data ...');
        if (!(selectedImage instanceof File)) {
            toast.error('Invalid image file selected',{id});
            setIsLoading(false);
            return;
        }
        try {
            // make payload
            const payload:TBlog ={
                title:data.title,
                content:data.content,
                blogTags:data.blogTags.split(',').map((tag:string) => tag),
            }


            const formData = new FormData();
            formData.append('data', JSON.stringify(payload));
            formData.append('image', selectedImage);
            // create new project
            const res = await create_new_blog(formData)
            if (res?.success) {
                toast.success('Blog successfully created', {id});
                reset()
                setSelectedImage(null);
                setImagePreview(null);
            } else {
                toast.error(res?.message, {id});
            }
            setIsLoading(false);

        } catch (error) {
            toast.error(JSON.stringify(error) || 'Failed to create product', {id});
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden"
            >
                <div className="bg-secondary p-6 text-center">
                    <h1 className="text-2xl font-bold ">Create New Blog</h1>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8"

                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-5">

                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Blog Title
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="title"
                                        type="title"
                                        {...register('title', {required: 'Blog Title is required'})}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="World Info dev"
                                    />
                                </div>
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                )}
                            </div>


                            {/* Blog Tags */}
                            <div className="space-y-2">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Blog Tags (comma separated)
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <textarea
                                        id="tags"
                                        rows={6}
                                        {...register('blogTags', {required: 'Blog tag is required'})}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Enter Blog Tag-> react, node, foryou,....."
                                    />
                                </div>
                                {errors.blogTags && (
                                    <p className="mt-1 text-sm text-red-600">{errors.blogTags.message}</p>
                                )}
                            </div>


                        </div>


                        {/* Product Image Upload */}
                        <div className="space-y-2">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Blog Image
                            </label>
                            <div className="mt-1 flex flex-col items-center">
                                {imagePreview ? (
                                    <div className="mb-4 relative">
                                        <div
                                            className="relative"
                                        >
                                            <Image
                                                src={imagePreview}
                                                alt="Product preview"
                                                width={100}
                                                height={100}
                                                className="w-full h-64 object-contain rounded-md border border-gray-300"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedImage(null);
                                                    setImagePreview(null);
                                                }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                                            >
                                                <FaTimes className="h-4 w-4"/>
                                            </button>
                                        </div>
                                        <div className="mt-2 text-center text-sm text-gray-600">
                                            <FaCheck className="inline-block mr-1 text-green-500"/>
                                            Image selected: {selectedImage?.name}
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`flex justify-center px-6 pt-5 pb-6 border-2 ${dragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 border-dashed'} rounded-md w-full h-64 transition-colors duration-200`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                        onClick={triggerFileInput}
                                    >
                                        <div
                                            className="space-y-1 text-center flex flex-col items-center justify-center">
                                            <div
                                            >
                                                <FaImage className="mx-auto h-12 w-12 text-gray-400"/>
                                            </div>
                                            <div className="flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="image-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        ref={fileInputRef}
                                                        id="image-upload"
                                                        name="image-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        className="sr-only"
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to 10MB</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                Blog Description
                            </label>
                            <Controller
                                name="content"
                                control={control}
                                defaultValue=""
                                render={({field: {onChange, value}}) => (
                                    <MdEditor
                                        value={value}
                                        style={{height: "500px"}}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={({text}) => onChange(text)}

                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div
                        className="mt-8 flex justify-end"
                    >
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className={` ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Blog...
                                </>
                            ) : (
                                <>
                                    Create Blog
                                    <FaArrowRight className="ml-2"/>
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default AddBlogForm;

