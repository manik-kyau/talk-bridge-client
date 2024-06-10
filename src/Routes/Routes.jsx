import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import PrivateRoutes from "./PrivateRoute";
import Secret from "../Pages/Secret/Secret";
import PostDetails from "../Pages/PostDetails/PostDetails";
import Dashboard from "../Layout/Dashboard";
import AddPost from "../Pages/Dashboard/AddPost/AddPost";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";

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
                path:'/login',
                element:<Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/secret',
                element: <PrivateRoutes><Secret></Secret></PrivateRoutes>
            },
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
            {
                path: 'myProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'addPost',
                element: <AddPost></AddPost>
            },
        ]
    }
]);