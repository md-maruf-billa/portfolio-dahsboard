"use client";


import {FaBlogger, FaComments} from "react-icons/fa";
import {GoProjectRoadmap} from "react-icons/go";
import {GiSkills} from "react-icons/gi";
import {ViewMessageDialog} from "@/components/view-message-dialog";

interface DashboardData {
    project: {
        totalProject: number;
        activeProject: number;
        deleteProject: number;
    };
    blog: {
        totalBlog: number;
        activeBlog: number;
        deleteBlog: number;
    };
    skill: {
        totalSkill: number;
        activeSkill: number;
        deleteSkill: number;
    };
    message: {
        totalMessage: number;
        newMessage: number;
        oldMessage: number;
        message: Message[];
    };
}

export interface Message {
    _id: string;
    messageBody: string;
    messageTitle: string;
    senderEmail: string;
    senderName: string;
    isReded: boolean;
    createdAt: string; // ISO 8601 string
    updatedAt: string; // ISO 8601 string
    __v: number;
}


function DashboardOverview({data}: { data: DashboardData }) {

    return (
        <div className=" p-6">
            <div className="mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
                    <p className="mt-2 text-gray-600">Welcome back, Abu-Mahid</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div
                        className="bg-white rounded-lg shadow-sm p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Project&#39;s</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{data?.project?.totalProject}</h3>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <GoProjectRoadmap className="text-green-600 text-xl"/>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end items-center gap-8 text-sm">
                            <div className="text-center">
                                <p className="text-gray-500">Active</p>
                                <p className="font-medium text-green-600">{data?.project?.activeProject}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500">Deleted</p>
                                <p className="font-medium text-red-600">{data?.project?.deleteProject}</p>
                            </div>
                        </div>
                    </div>

                    {/* Review Analytics */}
                    <div
                        className="bg-white rounded-lg shadow-sm p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Blog&#39;s</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{data?.blog?.totalBlog}</h3>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <FaBlogger className="text-purple-500 text-xl"/>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end items-center gap-8 text-sm">
                            <div className="text-center">
                                <p className="text-gray-500">Active</p>
                                <p className="font-medium text-green-600">{data?.blog?.activeBlog}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500">Deleted</p>
                                <p className="font-medium text-red-600">{data?.blog?.deleteBlog}</p>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Skill&#39;s</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{data?.skill?.totalSkill}</h3>
                            </div>
                            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                                <GiSkills className="text-amber-600 text-xl"/>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end items-center gap-8 text-sm">
                            <div className="text-center">
                                <p className="text-gray-500">Active</p>
                                <p className="font-medium text-green-600">{data?.skill?.activeSkill}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500">Deleted</p>
                                <p className="font-medium text-red-600">{data?.skill?.deleteSkill}</p>
                            </div>
                        </div>

                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Message&#39;s</p>
                                <h3 className="text-2xl font-bold text-gray-900 mt-1">{data?.message?.totalMessage}</h3>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <FaComments className="text-blue-600 text-xl"/>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end items-center gap-8 text-sm">
                            <div className="text-center">
                                <p className="text-gray-500">New</p>
                                <p className="font-medium text-green-600">{data?.message?.newMessage}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-500">Old</p>
                                <p className="font-medium text-red-600">{data?.message?.oldMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Messages</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sending Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subject
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sender Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sender Email
                                </th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {data?.message?.message.map((message) => (
                                <tr key={message._id} className={`${!message?.isReded && "bg-purple-100"}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {message.messageTitle?.slice(0, 30)} ...
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {message.senderName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {message.senderEmail}
                                    </td>
                                    <td className={`${message?.isReded? "text-green-500":"text-red-500"} px-6 py-4 whitespace-nowrap text-sm `}>
                                        {message?.isReded? "Resolved" : "Unread"}
                                    </td>
                                    <td className="">
                                        <ViewMessageDialog message={message} />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardOverview;
