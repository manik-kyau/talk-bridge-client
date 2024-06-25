import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import toast from "react-hot-toast";


const UpdatePosts = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const [post, setPost] = useState([]);

    const { postTitle, postDescription, tag, upVote, downVote, authorName, authorEmail, authorImage, postTime, _id } = post;

    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const onSubmit = async (data) => {
        // console.log(data);
        const updatePost = {
            postTitle: data.title,
            postDescription: data.description,
            tag: data.tags,
        }
        const postRes = await axiosSecure.patch(`/totalPost/${_id}`, updatePost)
        console.log(postRes.data);
        if (postRes.data.modifiedCount > 0) {
            toast.success('Updated successfully Done.')
            // reset();
        }
    }

    useEffect(() => {
        axiosSecure.get('/totalPost')
            .then(res => {
                const findPost = res.data.find(dta => dta._id === id);
                // console.log(findPost);
                setPost(findPost)
            })
    }, [])

    return (
        <div>
            <Helmet>
                <title>Upadate Post</title>
            </Helmet>
            <div>
                <div
                // className={shouldHideButton ? 'hidden' : 'block'}
                >
                    <div className='text-center space-y-4 mt-8'>
                        <h2 className='text-5xl font-bold'>Update Post</h2>
                        <p className='text-base font-medium md:w-2/3 mx-auto'>Provide a concise description (a few sentences) of the most essential elements of the assignment. It is helpful to make sure the most important information about the genre, purpose, topic(s), and length of the paper are very easy to find.</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="my-12">
                        <div className="flex flex-col md:flex-row md:gap-8">
                            <div className="mb-3 md:w-1/2">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Post Title</span>
                                    <input
                                        type="text"
                                        name='title'
                                        defaultValue={postTitle}
                                        {...register("title", { required: true })}
                                        placeholder="Enter Title"
                                        className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                    {errors.title?.type === "required" && <span className="text-red-500">Please enter title.</span>}
                                </label>
                            </div>
                            <div className="w-full  md:w-1/2 md:gap-8">
                                <div className="mb-3 w-full">
                                    <label className="block w-full">
                                        <span className="mb-1 text-lg font-semibold">Post Tag</span>
                                        <select className='text-base w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1'
                                            name="tags"
                                            defaultValue={tag}
                                            {...register("tags", { required: false })}
                                        >

                                            <option value="team-collaboration">Team Collaboration</option>
                                            <option value="virtual-meetings">Virtual Meetings</option>
                                            <option value="knowledge-base">Knowledge Base</option>
                                            <option value="real-time-communication">Real-Time Communication</option>
                                        </select>
                                        {errors.tags?.type === "required" && <span className="text-red-500">Please select tag.</span>}
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* <div className="flex flex-col md:flex-row md:gap-8">
                            <div className="mb-3 w-full">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Post Tag</span>
                                    <select className='text-base w-full md:w-1/2 outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1'
                                        name="tags"
                                        defaultValue={tag}
                                        {...register("tags", { required: false })}
                                    >

                                        <option value="team-collaboration">Team Collaboration</option>
                                        <option value="virtual-meetings">Virtual Meetings</option>
                                        <option value="knowledge-base">Knowledge Base</option>
                                        <option value="real-time-communication">Real-Time Communication</option>
                                    </select>
                                    {errors.tags?.type === "required" && <span className="text-red-500">Please select tag.</span>}
                                </label>
                            </div>
                        </div> */}
                        <div className="mb-3">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Post Description</span>
                                <textarea
                                    type="text"
                                    name='description'
                                    defaultValue={postDescription}
                                    {...register("description", { required: true })}
                                    placeholder="Enter Description"
                                    className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                {errors.description?.type === "required" && <span className="text-red-500">Please enter description</span>}
                            </label>
                        </div>

                        <div className='mt-6'>
                            <button type="submit" className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg w-full font-bold py-2 px-4 rounded">Add Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdatePosts;