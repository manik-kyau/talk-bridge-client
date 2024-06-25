
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import useAnnouncement from '../../../Hooks/useAnnouncement';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AllAnnouncements = () => {
    const [announcements, , refetch] = useAnnouncement();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (announcement) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.delete(`/announcements/${announcement._id}`)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${announcement.title} has been deleted.`,
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>All Announcement</title>
            </Helmet>
            <div>
                <div className="">
                    <h2 className="text-3xl font-semibold">Total Announcements: {announcements.length} </h2>
                </div>
                <div className="overflow-x-auto mt-8">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg font-bold ">
                            <tr className="">
                                <th></th>
                                {/* <th>User Image</th> */}
                                <th>AUTHOR IMAGE</th>
                                <th>AUTHOR NAME</th>
                                <th>ANNOUNCEMENT</th>
                                <th>ACTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                announcements.map((announcement, idx) => <tr key={idx}>
                                    <th className="text-base font-semibold">{idx + 1}</th>

                                    <td className="">
                                        <img className="w-[50px] h-[50px] rounded-xl" src={announcement.image} alt="" />
                                    </td>
                                    <td className="text-base font-semibold">{announcement.authorName}</td>
                                    <td className="text-base font-semibold">{announcement.title}</td>
                                    {/* <td></td> */}
                                    <td className="">
                                        <Link to={`/dashboard/updateAnnouncement/${announcement._id}`}>
                                            <button className="flex items-center justify-center text-center btn-xs py-4 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white rounded-lg"><FiEdit className="text-xl "></FiEdit></button>
                                        </Link>
                                    </td>
                                    <th className="">
                                        <button onClick={() => handleDeleteItem(announcement)} className="flex items-center justify-center text-center btn-xs py-4 bg-red-700 text-white rounded-lg"><RiDeleteBin6Line className="text-xl "></RiDeleteBin6Line></button>
                                    </th>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllAnnouncements;