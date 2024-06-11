import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async()=>{
            const res = await axiosSecure.get('/users');
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
                axiosSecure.delete(`/users/${id}`)
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
            <div className="">
                <h2 className="text-3xl font-semibold">Total Users: {users.length}</h2>
            </div>
            {/* table */}
            <div className="overflow-x-auto mt-8">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#D1A054] text-white text-lg font-bold ">
                        <tr className="">
                            <th></th>
                            {/* <th>User Image</th> */}
                            <th className="">USER NAME</th>
                            <th>USER EMAIL</th>
                            <th>BADGE</th>
                            <th>MAKE ADMIN</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) => <tr key={idx}>
                                <th className="text-base font-semibold">{idx + 1}</th>
                                
                                <td className="text-base font-semibold">{user.name}</td>
                                <td className="text-base font-semibold">{user.email}</td>
                                <td className="text-base font-semibold">{user.badge}</td>
                                <td className="">
                                    {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="flex items-center justify-center text-center btn-xs py-4 bg-[#D1A054] text-white rounded-lg">
                                        {/* <FaUsers className="text-xl "></FaUsers>*/}
                                        <h2 className="text-base">Make Admin</h2>
                                    </button>}
                                </td>
                                <th className="">
                                    <button onClick={() => handleDeleteUser(user._id)} className="flex items-center justify-center text-center btn-xs py-4 bg-red-700 text-white rounded-lg"><RiDeleteBin6Line className="text-xl "></RiDeleteBin6Line></button>
                                </th>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default ManageUsers;