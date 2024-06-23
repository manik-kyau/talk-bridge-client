import { Link } from "react-router-dom";
import usePosts from "../../../Hooks/usePosts";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManagePosts = () => {
    const [posts] = usePosts();
    // console.log(posts);
    return (
        <div>
            <div className="overflow-x-auto mt-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg font-bold ">
                        <tr className="">
                            <th></th>
                            {/* <th>User Image</th> */}
                            <th>POST TITLE</th>
                            <th>AUTHOR NAME</th>
                            <th>AUTHOR EMAIL</th>
                            <th>ACTION</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post, idx) => <tr key={idx}>
                                <th className="text-base font-semibold">{idx + 1}</th>

                                {/* <td className="">
                                    <img className="w-[50px] h-[50px] " src={announcement.image} alt="" />
                                </td> */}
                                <td className="text-base font-semibold">{post.postTitle}</td>
                                <td className="text-base font-semibold">{post.authorName}</td>
                                <td className="text-base font-semibold">{post.authorEmail}</td>
                                {/* <td></td> */}
                                <td className="">
                                    <Link to={`/dashboard/updatePost/${post._id}`}>
                                        <button className="flex items-center justify-center text-center btn-xs py-4 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white rounded-lg"><FiEdit className="text-xl "></FiEdit></button>
                                    </Link>
                                </td>
                                <th className="">
                                    <button onClick={() => handleDeleteItem(post)} className="flex items-center justify-center text-center btn-xs py-4 bg-red-700 text-white rounded-lg"><RiDeleteBin6Line className="text-xl "></RiDeleteBin6Line></button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManagePosts;