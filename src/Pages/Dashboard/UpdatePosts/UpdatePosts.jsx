import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

import toast from "react-hot-toast";


const UpdatePosts = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();

    const [post, setPost] = useState([]);

    const {postTitle,postDescription,tag, upVote,downVote, authorName, authorEmail,authorImage,postTime,_id} = post;

    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    // const onSubmit = async (data) => {
    //     // console.log(data);
    //         const updatePost = {
    //             postTitle: data.title,
    //             postDescription: data.description,
    //             tag: data.tags,
    //             upVote: data.upVote,
    //             downVote: data.downVote,
    //             authorName: data.name,
    //             authorEmail: data.email,
    //             authorImage: data.image,
    //             postTime: postTime,
    //         }
    //         const postRes = await axiosSecure.patch(`/posts/${_id}`, updatePost)
    //         console.log(postRes.data);
    //         if (postRes.data.modifiedCount > 0) {
    //             toast.success('Post Updated successfully Done.')
    //             // reset();
    //         }
    // }

    useEffect(() => {
        axiosSecure.get('/posts')
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
                        // onSubmit={handleSubmit(onSubmit)}
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
                            <div className="mb-3 md:w-1/2">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Post Description</span>
                                    <input
                                        type="text"
                                        name='description'
                                        defaultValue={postDescription}
                                        {...register("description", { required: true })}
                                        placeholder="Enter Description"
                                        className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                    {errors.description?.type === "required" && <span className="text-red-500">Please enter description</span>}
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:gap-8">
                            <div className="mb-3 w-full">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Post Tag</span>
                                    <select className='text-base w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1'
                                        name="tags"
                                        defaultValue={tag}
                                        {...register("tags", { required: false })}
                                    // required
                                    // id=""
                                    // onChange={handleCustomization}
                                    >

                                        <option value="team-collaboration">Team Collaboration</option>
                                        <option value="virtual-meetings">Virtual Meetings</option>
                                        <option value="knowledge-base">Knowledge Base</option>
                                        <option value="real-time-communication">Real-Time Communication</option>
                                    </select>
                                    {errors.tags?.type === "required" && <span className="text-red-500">Please select tag.</span>}
                                </label>
                            </div>
                            {/* TODO: */}
                        </div>

                        <div className="flex flex-col md:flex-row md:gap-8">
                            <div className="mb-3 md:w-1/2">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">UpVote</span>
                                    <input
                                        type="number"
                                        name='upVote'
                                        defaultValue={upVote}
                                        {...register("upVote", { required: false })}
                                        value='0'
                                        placeholder="Enter Photo URL"
                                        className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                </label>
                            </div>
                            <div className="mb-3 md:w-1/2">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Down Vote</span>
                                    <input
                                        type="number"
                                        name='downVote'
                                        defaultValue={downVote}
                                        {...register("downVote", { required: false })}
                                        value='0'
                                        placeholder=""
                                        className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                </label>
                            </div>
                        </div>
                        <div className="mb-3 ">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Author Name</span>
                                <input
                                    type="text"
                                    // value={user?.displayName}
                                    defaultValue={authorName}
                                    name='name'
                                    {...register("name", { required: true })}
                                    placeholder="Enter Name"
                                    className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                {/* {errors.name?.type === "required" && <span className="text-red-500">Please select tag.</span>} */}
                            </label>
                        </div>

                        <div className="flex flex-col md:flex-row md:gap-8">
                            <div className="mb-3 md:w-1/2">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Author Email</span>
                                    <input
                                        type="email"
                                        name='email'
                                        defaultValue={authorEmail}
                                        {...register("email", { required: true })}
                                        placeholder="Enter Email"
                                        className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                    {/* {errors.email?.type === "required" && <span className="text-red-500">Please select tag.</span>} */}
                                </label>
                            </div>
                            <div className="mb-3 md:w-1/2">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Author Image</span>
                                    <input
                                        type="url"
                                        name='image'
                                        defaultValue={authorImage}
                                        {...register("image", { required:false })}
                                        // value={user?.photoURL}
                                        placeholder="Enter Image Link"
                                        className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                    {errors.image?.type === "required" && <span className="text-red-500">Please enter your photo.</span>}
                                </label>
                            </div>
                        </div>

                        <div className='mt-6'>
                            <button type="submit" className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg w-full font-bold py-2 px-4 rounded">Add Post</button>
                        </div>
                    </form>
                </div>
                {/* Pay button */}
            </div>
        </div>
    );
};

export default UpdatePosts;