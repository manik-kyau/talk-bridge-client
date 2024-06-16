import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useMyPosts from "../../../Hooks/useMyPosts";
import { Link, useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPost = () => {

    const { user } = useAuth();
    const [myPosts] = useMyPosts();
    console.log(myPosts);

    const [userBadge, setUserBadge] = useState([]);
    console.log(userBadge.badge);

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => {
                const findMe = data.find(dta => dta.email == user.email);
                // console.log(findMe.badge);
                setUserBadge(findMe)
            })
    }, [])

    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
        if (res.data.success) {
            const posts = {
                postTitle: data.title,
                postDescription: data.description,
                tag: data.tags,
                postTime: new Date(),
                upVote: data.upVote,
                downVote: data.downVote,
                authorName: data.name,
                authorEmail: user?.email,
                authorImage: res.data.data.display_url
            }
            const postRes = await axiosSecure.post('/posts', posts)
            console.log(postRes.data);
            if (postRes.data.insertedId) {
                toast.success('Post Created successfully Done.')
                navigate('/dashboard/myPosts')
                reset();
            }
        }
        console.log('with image url', res.data);
    }

    const shouldHideButton = userBadge.badge === 'bronze' && myPosts.length === 5;

    return (
        <div>
            <Helmet>
                <title>Add Post</title>
            </Helmet>
            <div>
                <div className={shouldHideButton ? 'hidden' : 'block'}>
                    <div className='text-center space-y-4 mt-8'>
                        <h2 className='text-5xl font-bold'>Create Post</h2>
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
                                    value={user?.displayName}
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
                                        {...register("email", { required: true })}
                                        value={user?.email}
                                        placeholder="Enter Email"
                                        className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                    {/* {errors.email?.type === "required" && <span className="text-red-500">Please select tag.</span>} */}
                                </label>
                            </div>
                            <div className="mb-3 md:w-1/2">
                                <label className="block w-full">
                                    <span className="mb-1 text-lg font-semibold">Author Image</span>
                                    <input
                                        type="file"
                                        name='image'
                                        {...register("image", { required: true })}
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
                <div className={shouldHideButton ? 'block':'hidden'}>
                    <div className="border flex flex-col justify-center items-center min-h-screen space-y-5">
                        <p className="text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, eaque. Libero ratione nemo vitae mollitia dolorem, quod quo officiis soluta impedit in necessitatibus qui distinctio aperiam voluptatum alias reiciendis magnam?</p>
                        <Link to='/membership'>
                            <button className="btn bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg">pay</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPost;