import { Link } from "react-router-dom";
// import usePosts from "../../../Hooks/usePosts";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const ManagePosts = () => {

    // const [posts] = usePosts();
    const axiosSecure = useAxiosSecure();

    const {data: totalPosts = [], refetch} = useQuery({
        queryKey: ['totalPost'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/totalPost`);
            return res.data;
        }
    });
    // console.log(posts);
    const handleDeleteItem = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/totalPost/${id}`)
                    .then(res => {
                        // console.log(res.data);
                        refetch();
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
          });
    }
    return (
        <div>
            <Helmet>
                <title>Manage Posts</title>
            </Helmet>
            <div className="">
                <h2 className="text-3xl font-semibold">Total Posts: {totalPosts.length}</h2>
            </div>
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
                            totalPosts.map((post, idx) => <tr key={idx}>
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
                                    <button onClick={() => handleDeleteItem(post._id)} className="flex items-center justify-center text-center btn-xs py-4 bg-red-700 text-white rounded-lg"><RiDeleteBin6Line className="text-xl "></RiDeleteBin6Line></button>
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