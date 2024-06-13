import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const Dashboard = () => {
    // get isAdmin value from the database 
    const [isAdmin] = useAdmin();
    return (
        <div className="flex gap-6 max-w-[1180px] mx-auto">
            <div className="w-64 min-h-screen bg-gradient-to-r from-[#7E90FE] to-[#9873FF]">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            {/* <li className="text-lg font-medium"><NavLink to='/dashboard/adminHome'>Admin Home</NavLink></li> */}
                            <li className="text-lg font-medium"><NavLink to='/dashboard/adminProfile'>Admin Profile</NavLink></li>
                            <li className="text-lg font-medium"><NavLink to='/dashboard/manageUsers'>Manage Users</NavLink></li>
                            <li className="text-lg font-medium"><NavLink to='/dashboard/allAnnouncements'>All Announcements</NavLink></li>
                            <li className="text-lg font-medium"><NavLink to='/dashboard/reportedComments'>Reported Comments</NavLink></li>
                            <li className="text-lg font-medium"><NavLink to='/dashboard/announcement'>Make Announcement</NavLink></li>
                        </>
                            :
                            <>
                                <li className="text-lg font-medium"><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                                <li className="text-lg font-medium"><NavLink to='/dashboard/addPost'>Add Post</NavLink></li>
                                <li className="text-lg font-medium"><NavLink to='/dashboard/myPosts'>My Posts</NavLink></li>
                            </>
                    }

                    {/* dIVIDER */}
                    <div className="divider">OR</div>

                    <li className="text-lg font-medium"><NavLink to='/'>Home</NavLink></li>
                    <li className="text-lg font-medium"><NavLink to='/membership'>Membership</NavLink></li>

                </ul>
            </div>
            <div className="flex-1 border p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;