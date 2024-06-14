import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateAnnouncement = () => {

    const announcement = useLoaderData();
    const { title, description, authorName, image, _id } = announcement;
    console.log(announcement);
    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data',
            }
        })
        if (res.data.success) {
            const announcement = {
                title: data.title,
                description: data.description,
                authorName: data.name,
                image: res.data.data.display_url
            }
            const announcementRes = await axiosSecure.patch(`/announcements/${_id}`, announcement)
            console.log(announcementRes.data);
            if (announcementRes.data.modifiedCount > 0) {
                toast.success('Announcement Updated successfully Done.')
                // reset();
            }
        }
        console.log('with image url', res.data);
    }

    return (
        <div>
            <Helmet>
                <title>Update Announcement</title>
            </Helmet>
            <div>
                <div className='text-center space-y-4 mt-8'>
                    <h2 className='text-5xl font-bold'>Update Announcement</h2>
                    <p className='text-base font-medium md:w-2/3 mx-auto'>Provide a concise description (a few sentences) of the most essential elements of the assignment. It is helpful to make sure the most important information about the genre, purpose, topic(s), and length of the paper are very easy to find.</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="my-12">
                    <div className="flex flex-col md:flex-row md:gap-8">
                        <div className="mb-3 md:w-1/2">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Title</span>
                                <input
                                    defaultValue={title}
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
                                <span className="mb-1 text-lg font-semibold">Description</span>
                                <input
                                    defaultValue={description}
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
                        <div className="mb-3 md:w-1/2">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Author Name</span>
                                <input
                                    defaultValue={authorName}
                                    type="text"
                                    name='name'
                                    {...register("name", { required: true })}
                                    placeholder="Enter name"
                                    className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                {errors.name?.type === "required" && <span className="text-red-500">Please enter your name.</span>}
                            </label>
                        </div>
                        <div className="mb-3 md:w-1/2">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Author Image</span>
                                <input
                                    // defaultValue={image}
                                    type="file"
                                    name='image'
                                    {...register("image", { required: true })}
                                    placeholder="Enter Image Link"
                                    className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                                {errors.photo?.type === "required" && <span className="text-red-500">Please enter your photo</span>}
                            </label>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg w-full font-bold py-2 px-4 rounded">Update Announcement</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateAnnouncement;