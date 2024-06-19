import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

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

    // create admin 
    const handleMakeAdmin=(user)=>{
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res =>{
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                toast.success(`${user.name} is an admin now!`);
                refetch();
            }
        })
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
                    <thead className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg font-bold ">
                        <tr className="">
                            <th></th>
                            {/* <th>User Image</th> */}
                            <th className="">USER NAME</th>
                            <th>USER EMAIL</th>
                            <th>SUBSCRIPTION STATUS</th>
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
                                <td className="text-base font-semibold">{user.badge == "Gold" ? "Member" : ""}</td>
                                <td className="">
                                    <button onClick={() => handleMakeAdmin(user)} className={user.role === 'admin' ? 'bg-orange-500 w-full text-white py-1 rounded-lg' : 'flex items-center justify-center text-center w-full btn-xs py-4 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white rounded-lg'}>
                                        <h2 className="text-base">{user.role == 'admin' ? 'Admin' : 'Make Admin'}</h2>
                                    </button>
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