import { Helmet } from "react-helmet-async";
import useAuth from "../../../Hooks/useAuth";

const AddPost = () => {

    const { user } = useAuth();

    const handleCustomization = (event) => {
        console.log(event.target.value);
    };

    return (
        <div>
            <Helmet>
                <title>Add Post</title>
            </Helmet>
            <div>
                <div className='text-center space-y-4 mt-8'>
                    <h2 className='text-5xl font-bold'>Create Post</h2>
                    <p className='text-base font-medium md:w-2/3 mx-auto'>Provide a concise description (a few sentences) of the most essential elements of the assignment. It is helpful to make sure the most important information about the genre, purpose, topic(s), and length of the paper are very easy to find.</p>
                </div>
                <form
                    // onSubmit={handleCreateAssignment}
                    className="my-12">
                    <div className="flex flex-col md:flex-row md:gap-8">
                        <div className="mb-3 md:w-1/2">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Post Title</span>
                                <input type="text" name='title' placeholder="Enter Title" className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                            </label>
                        </div>
                        <div className="mb-3 md:w-1/2">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Post Description</span>
                                <input type="text" name='description' placeholder="Enter Description" className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-8">
                        <div className="mb-3 w-full">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Post Tag</span>
                                <select className='text-base w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1' name="difficultyLevel" required id="" onChange={handleCustomization}
                                >
                                    {/* <option className='bg-white text-black' value="" disabled>Post Tag</option> */}
                                    <option value="team-collaboration">Team Collaboration</option>
                                    <option value="virtual-meetings">Virtual Meetings</option>
                                    <option value="knowledge-base">Knowledge Base</option>
                                    <option value="real-time-communication">Real-Time Communication</option>
                                </select>
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
                                placeholder="Enter Name"
                                className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                        </label>
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-8">
                        <div className="mb-3 md:w-1/2">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Author Email</span>
                                <input
                                    type="email"
                                    name='email'
                                    value={user?.email}
                                    placeholder="Enter Email"
                                    className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                            </label>
                        </div>
                        <div className="mb-3 md:w-1/2">
                            <label className="block w-full">
                                <span className="mb-1 text-lg font-semibold">Author Image</span>
                                <input
                                    type="text"
                                    name='userEmail'
                                    value={user?.photoURL}
                                    placeholder="Enter Image Link"
                                    className="block w-full outline-none rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 p-2 dark:bg-gray-100 border mt-1" />
                            </label>
                        </div>
                    </div>

                    <div className='mt-6'>
                        <button type="submit" className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg w-full font-bold py-2 px-4 rounded">Add Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;