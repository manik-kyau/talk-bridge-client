import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { IoSearchSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {

    // const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const [search, setSearch] = useState('');
    // const [users, setUsers] = useState([]);

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch,  } = useQuery({
        queryKey: ['users',search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`);
            return res.data;
        },
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
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    toast.success(`${user.name} is an admin now!`);
                    refetch();
                }
            })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        const searchText = e.target.search.value;
        setSearch(searchText);
    }

    return (
        <div>
            <Helmet>
                <title>Manage Users</title>
            </Helmet>
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-semibold">Total Users: {users.length}</h2>

                {/* Open the modal using document.getElementById('ID').showModal() method */}

                <button className="cursor-pointer" onClick={() => document.getElementById('my_modal_3').showModal()}><IoSearchSharp className="text-3xl mr-[60px]" /></button>
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className=" flex justify-center" >
                            <form
                                // onSubmit={handleSubmit(onSubmit)}
                                onSubmit={handleSearch}

                            >
                                <div className=" flex items-center">
                                    <input
                                        type="text"
                                        name="search"
                                        // {...register("search", { required: true })}
                                        placeholder="Search"
                                        required
                                        className="border outline-none p-2 my-4 rounded-l-md" />
                                    <button className="bg-gradient-to-r text-lg rounded-r-md from-[#7E90FE] to-[#9873FF] text-white py-[7px] px-4">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>

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
                                <td className="text-base font-semibold">{user.badge == "Gold" ? "Membership" : ""}</td>
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