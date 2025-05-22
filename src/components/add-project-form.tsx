"use client";
import React, {useState, useRef,} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {
    FaAlignLeft,
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
import {TProject} from "@/types/project";
import {create_new_project} from "@/server/project";
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
    ssr: false,
});


type FormValues = {
    projectName: string
    description: string
    slogan: string
    technologies: string
    features: string
    frontEndGitRepo: string
    backEndGitRepo: string
    liveLink: string
};



const AddProjectForm = () => {
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
            projectName: "",
            description: "",
            slogan: '',
            technologies: "",
            features: "",
            frontEndGitRepo: "",
            backEndGitRepo: "",
            liveLink: ""
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
            toast.error('Invalid image file selected');
            return;
        }

        const payload:TProject = {
            projectName: data?.projectName,
            slogan:data?.slogan,
            description: data?.description,
            technologies: data?.technologies?.split(",").map((technology:string) => technology),
            features: data?.features?.split(",").map((fet:string)=>fet),
            frontEndGitRepo:data?.frontEndGitRepo,
            backEndGitRepo:data?.backEndGitRepo,
            liveLink: data?.liveLink
        }
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify(payload));
            formData.append('image', selectedImage);
            // create new project
            const res = await create_new_project(formData)
            if(res?.success){
                toast.success('Product successfully created',{id});
                reset()
                setSelectedImage(null);
                setImagePreview(null);
            }else{
                toast.error(res?.message,{id});
            }

        } catch (error) {
            toast.error(JSON.stringify(error) || 'Failed to create product', {id});
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div
                className="bg-white rounded-lg shadow-md overflow-hidden"
            >
                <div className="bg-secondary p-6 text-center">
                    <h1 className="text-2xl font-bold ">Create New Project</h1>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-8"

                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Project Name
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="name"
                                        type="text"
                                        {...register('projectName', {required: 'Project name is required'})}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="World Info dev"
                                    />
                                </div>
                                {errors.projectName && (
                                    <p className="mt-1 text-sm text-red-600">{errors.projectName.message}</p>
                                )}
                            </div>

                            {/* Product Price */}
                            <div className="space-y-2">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Slogan
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="price"
                                        type="text"
                                        {...register('slogan', {
                                            required: 'Slogan is required!',
                                        })}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Explore world and learn more.."
                                    />
                                </div>
                                {errors.slogan && (
                                    <p className="mt-1 text-sm text-red-600">{errors.slogan.message}</p>
                                )}
                            </div>

                            {/* Product Tags */}
                            <div className="space-y-2">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Used Technologies (comma separated)
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="tags"
                                        type="text"
                                        {...register('technologies', {
                                            required: 'Technology is required!',
                                        })}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Next.js, React js, TypeScript"
                                    />
                                </div>
                                {errors.technologies && (
                                    <p className="mt-1 text-sm text-red-600">{errors.technologies.message}</p>
                                )}
                            </div>


                            {/* Project Featured */}
                            <div className="space-y-2">
                                <label htmlFor="features" className="block text-sm font-medium text-gray-700">
                                    Project Features (comma separated)
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                        <FaAlignLeft className="h-5 w-5 text-gray-400"/>
                                    </div>
                                    <textarea
                                        id="features"
                                        rows={10}
                                        {...register('features', {required: 'Feature is required'})}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="Enter projecr features-> Live updage, Realtime communication.."
                                    />
                                </div>
                                {errors.features && (
                                    <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Live Demo Link
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="tags"
                                        type="text"
                                        {...register('liveLink', {
                                            required: 'Demo Link is required!',
                                        })}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="www.world-info.dev"
                                    />
                                </div>
                                {errors.liveLink && (
                                    <p className="mt-1 text-sm text-red-600">{errors.liveLink.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Front-end GitHub Link
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="tags"
                                        type="text"
                                        {...register('frontEndGitRepo', {
                                            required: 'Front-end Link is required!',
                                        })}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="www.github.com/md-maruf-billa/word-info-dev-client"
                                    />
                                </div>
                                {errors.frontEndGitRepo && (
                                    <p className="mt-1 text-sm text-red-600">{errors.frontEndGitRepo.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                    Back-end GitHub Link
                                </label>
                                <div className="relative rounded-md shadow-sm">
                                    <input
                                        id="tags"
                                        type="text"
                                        {...register('backEndGitRepo', {
                                            required: 'Back-end Link is required!',
                                        })}
                                        className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                                        placeholder="www.github.com/md-maruf-billa/word-info-dev-server"
                                    />
                                </div>
                                {errors.backEndGitRepo && (
                                    <p className="mt-1 text-sm text-red-600">{errors.backEndGitRepo.message}</p>
                                )}
                            </div>
                            {/* Product Image Upload */}
                            <div className="space-y-2">
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Product Image
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

                            {/* Tips Section */}
                            {/*<div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">*/}
                            {/*    <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for Great Project Listings</h3>*/}
                            {/*    <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">*/}
                            {/*        <li>Use high-quality, well-lit images that showcase your Project clearly</li>*/}
                            {/*        <li>Write detailed descriptions that highlight key features and benefits</li>*/}
                            {/*        <li>Include accurate dimensions, materials, and other specifications</li>*/}
                            {/*        <li>Use relevant tags to improve discoverability</li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                        </div>
                        <div className="col-span-2 space-y-2">
                            <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                                Project Description
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <MdEditor
                                        value={value}
                                        style={{ height: "500px" }}
                                        renderHTML={(text) => mdParser.render(text)}
                                        onChange={({ text }) => onChange(text)}

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
                                    Creating Project...
                                </>
                            ) : (
                                <>
                                    Create Project
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

export default AddProjectForm;

