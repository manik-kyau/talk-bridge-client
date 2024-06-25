
import { RiDeleteBin6Line } from "react-icons/ri";
import useMyPosts from "../../../Hooks/useMyPosts";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";

const MyPosts = () => {

    const {user} = useAuth();

    const axiosSecure = useAxiosSecure();
    const {data: posts = [], refetch} = useQuery({
        queryKey: ['specificPosts'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/specificPosts?authorEmail=${user?.email}`);
            return res.data;
        }
    });

    const handleDeleteUser = (id) => {
        // console.log(id);
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
                axiosSecure.delete(`/specificPosts/${id}`)
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
                <title>My Posts</title>
            </Helmet>
            <div className="">
                <h2 className="text-3xl font-semibold">Total Posts: {posts.length} </h2>
            </div>
            {/* table */}
            <div className="overflow-x-auto mt-8">
                <table className="table">
                    
                    <thead className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg font-bold ">
                        <tr className="">
                            <th></th>
                            
                            <th className="">POST TITLE</th>
                            <th>UPVOTE</th>
                            <th>DOWNVOTE</th>
                            <th>COMMENTS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((myPost, idx) => <tr key={idx}>
                                <th className="text-base font-semibold">{idx + 1}</th>
                                
                                <td className="text-base font-semibold">{myPost.postTitle}</td>
                                <td className="text-base font-semibold">{myPost.upVote}</td>
                                <td className="text-base font-semibold">{myPost.downVote}</td>
                                <td className="">
                                    <button 
                                    // onClick={() => handleMakeAdmin(user)} 
                                    className="btn bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg font-bol" >
                                        Comments
                                    </button>
                                </td>
                                <th className="">
                                    <button onClick={() => handleDeleteUser(myPost._id)} className="flex items-center justify-center text-center btn-xs py-4 bg-red-700 text-white rounded-lg"><RiDeleteBin6Line className="text-xl "></RiDeleteBin6Line></button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyPosts;