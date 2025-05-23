"use client"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { FaArrowRight, FaCheck, FaImage, FaTimes} from "react-icons/fa";
import Image from "next/image";
import {Controller, useForm} from "react-hook-form";
import React, {useEffect, useRef, useState} from "react";
import MarkdownIt from "markdown-it";
import {toast} from "sonner";
import dynamic from "next/dynamic";
import 'react-markdown-editor-lite/lib/index.css';
import {TBlog} from "@/types/blog";
import {update_blog} from "@/server/blog";

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});
type FormValues = {
    title: string;
    content: string;
    blogTags: string;
};

export function BlogUpdateDialog({data}: { data: TBlog }) {
    const [openModal, setOpenModal] = useState<boolean>(false);
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
        formState: {errors},
    } = useForm<FormValues>({
        defaultValues: {
            title: data?.title,
            content: data?.content,
            blogTags: data?.blogTags.join(","),
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

    const onSubmit = async (fieldData: FormValues) => {
        setIsLoading(true);
        const id = toast.loading('Verifying Project info ...');


        const payload: TBlog = {
            title: fieldData.title,
            content: fieldData.content,
            blogTags: fieldData.blogTags.split(',').map((tag: string) => tag),
        }
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(payload));
            if (selectedImage && (selectedImage instanceof File)) {
                formData.append('image', selectedImage);
            }

            // create new project
            const res = await update_blog(data?._id as string, formData)
            if (res?.success) {
                toast.success('Blog updated successful.', {id});
                setOpenModal(false);
                setSelectedImage(null);
                setImagePreview(null);
            } else {
                toast.error(res?.message, {id});
            }

        } catch (error) {
            toast.error(JSON.stringify(error) || 'Failed to update blog', {id});
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        setImagePreview(data?.blogImage as string);
    }, [data?.blogImage])

    return (
        <Dialog onOpenChange={setOpenModal} open={openModal}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    Update
                </Button>
            </DialogTrigger>
            <DialogContent className={"sm:max-w-[425px] md:max-w-5xl"}>
                <div className="w-full">
                    <div
                        className="bg-white rounded-lg overflow-hidden"
                    >
                        <div className="bg-secondary text-center py-4">
                            <h1 className="text-2xl font-bold ">Update Blog</h1>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    {/* Product Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Blog Title
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <input
                                                id="name"
                                                type="text"
                                                {...register('title', {required: 'Project name is required'})}
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
                                        <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                                            Blog Tags (comma separated)
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <textarea
                                                id="features"
                                                rows={5}
                                                {...register('blogTags', {required: 'Feature is required'})}
                                                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                                placeholder="Enter projecr features-> Live updage, Realtime communication.."
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
                                                        className="w-full h-56 object-contain rounded-md border border-gray-300"
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
                                                className={`flex justify-center px-6 pt-5 pb-6 border-2 ${dragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 border-dashed'} rounded-md w-full h-56 transition-colors duration-200`}
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
                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF, WEBP up to
                                                        10MB</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                            <div className="col-span-2 space-y-2 mt-4">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Blog Content
                                </label>
                                <Controller
                                    name="content"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
                                        <MdEditor
                                            value={value}
                                            style={{height: "250px"}}
                                            renderHTML={(text) => mdParser.render(text)}
                                            onChange={({text}) => onChange(text)}

                                        />
                                    )}
                                />
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
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Updating Blog...
                                        </>
                                    ) : (
                                        <>
                                            Update Blog
                                            <FaArrowRight className="ml-2"/>
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>


                </div>
            </DialogContent>
        </Dialog>
    )
}
