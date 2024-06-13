
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { IoNotifications } from "react-icons/io5";
import useAnnouncement from "../../../Hooks/useAnnouncement";

const Navbar = () => {

    const { user, logOut } = useAuth();
    const [annousments] = useAnnouncement();

    const NavItems = <>
        <li><NavLink to='/'
            className={({ isActive }) => isActive ? "bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text font-bold text-lg " : "text-lg font-bold WorkSans hover:text-white text-white hover:bg-gradient-to-r from-[#7E90FE] to-[#9873FF]"}
        >Home</NavLink></li>
        <li><NavLink to='/membership'
            className={({ isActive }) => isActive ? "bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text font-bold text-lg " : "text-lg font-bold WorkSans hover:text-white text-white hover:bg-gradient-to-r from-[#7E90FE] to-[#9873FF]"}
        >Membership</NavLink></li>
        <li><NavLink to='/secret'
            className={({ isActive }) => isActive ? "bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text font-bold text-lg " : "text-lg font-bold WorkSans hover:text-white text-white hover:bg-gradient-to-r from-[#7E90FE] to-[#9873FF]"}
        >Secret</NavLink></li>
        {/* <li><NavLink to='/register'
            className={({ isActive }) => isActive ? "bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text font-bold text-lg " : "text-lg font-bold WorkSans hover:text-white hover:bg-gradient-to-r from-[#7E90FE] to-[#9873FF]"}
        >register</NavLink></li> */}
    </>

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="fixed w-full lg:w-[1180px] bg-black bg-opacity-50  px-5 lg:px-0">
            <div className="navbar justify-between px-0">
                <div className="navbar-start">
                    <div className="dropdown  z-50">
                        <div tabIndex={0} role="button" className="lg:hidden mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {NavItems}
                        </ul>
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                        Talk<span className="bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text">Bridge</span>
                    </h2>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {NavItems}
                    </ul>
                </div>
                <div className="navbar-end w-full">

                    {/* <div className="mr-3">

                        <label className="swap swap-rotate">
                            <input
                                onChange={handleToggle}
                                type="checkbox"
                                className="theme-controller"
                                value="dark"
                            />
                            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

                            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>

                        </label>
                    </div> */}
                    <button className="flex mr-4">
                        <IoNotifications className="text-3xl text-[#9873FF]"></IoNotifications>
                        <div className="badge">+{annousments.length}</div>
                    </button>

                    {user && (
                        <div className='dropdown dropdown-end z-50 items-center'>

                            <div
                                tabIndex={0}
                                role='button'
                                className='btn btn-ghost btn-circle avatar'
                            >
                                <div title={user?.displayName} className='w-10 rounded-full'>
                                    <img
                                        referrerPolicy='no-referrer'
                                        alt='User Profile Photo'
                                        src={user.photoURL}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-md w-52'
                            >
                                <li className="text-lg font-bold">
                                    <h2>{user?.displayName}</h2>
                                </li>

                                <li className="text-lg font-bold">
                                    <Link to='dashboard'>Dashboard</Link>
                                </li>

                                <li className='mt-2'>
                                    <button onClick={handleLogOut} className='text-white bg-gradient-to-r from-[#7E90FE] to-[#9873FF] block text-lg font-semibold text-center'>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}

                    <div className="flex items-center">
                        {/* <div className="indicator">

                            <button className="flex">
                            <IoNotifications className="text-3xl text-[#9873FF]"></IoNotifications>
                                <div className="badge">+0</div>
                            </button>

                            <IoNotifications className="text-3xl mr-4  text-[#9873FF] "></IoNotifications>
                        </div> */}
                        <div>
                            {
                                user ? "" : <Link to='/login' className="btn bg-[#9873FF] text-white hover:bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-lg font-semibold border-none">Join US
                                </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;