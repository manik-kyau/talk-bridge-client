import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoute";
import PostDetails from "../Pages/PostDetails/PostDetails";
import Dashboard from "../Layout/Dashboard";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import MakeAnnouncement from "../Pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import AdminRoute from "./AdminRoute";
// import ManageAnnouncements from "../Pages/Dashboard/ManageAnnouncements/AllAnnouncements";
import AllAnnouncements from "../Pages/Dashboard/ManageAnnouncements/AllAnnouncements";
import UpdateAnnouncement from "../Pages/Dashboard/UpdateAnnouncement/UpdateAnnouncement";
import Membership from "../Pages/Membership/Membership";
import MyPosts from "../Pages/Dashboard/MyPosts/MyPosts";

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement:<ErrorPage></ErrorPage>,
        element: <Root></Root>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/membership',
                element:<PrivateRoutes><Membership></Membership></PrivateRoutes>,
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            // {
            //     path: '/secret',
            //     element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
            // },
            {
                path: '/postDetrails/:id',
                element: <PrivateRoutes><PostDetails></PostDetails></PrivateRoutes>,
                loader: ()=> fetch('http://localhost:5000/posts')
            },
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children:[
            // normal user Routes
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
            {
                path: 'myPosts',
                element: <MyPosts></MyPosts>
            },

            //Only Admin Routes
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: 'announcement',
                element: <AdminRoute><MakeAnnouncement></MakeAnnouncement></AdminRoute>
            },
            {
                path: 'allAnnouncements',
                element: <AdminRoute><AllAnnouncements></AllAnnouncements></AdminRoute>
            },
            {
                path: 'updateAnnouncement/:id',
                element: <AdminRoute><UpdateAnnouncement></UpdateAnnouncement></AdminRoute>,
                loader: ({params})=> fetch(`http://localhost:5000/announcements/${params.id}`),
            },
        ]
    }
]);