import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex gap-6 max-w-[1180px] mx-auto">
            <div className="w-64 min-h-screen bg-gradient-to-r from-[#7E90FE] to-[#9873FF]">
                <ul className="menu">
                    <li className="text-lg font-medium"><NavLink to='/dashboard/myProfile'>My Profile</NavLink></li>
                    <li className="text-lg font-medium"><NavLink to='/dashboard/addPost'>Add Post</NavLink></li>
                    <li className="text-lg font-medium"><NavLink to='/dashboard/myPosts'>My Posts</NavLink></li>

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