import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/images/login2.webp";
import google from '../../assets/images/google.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Google from "../Shared/Google/Google";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { userLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const from = location.state?.from?.pathname || "/";
    // console.log('state in the location login page', location.state);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        userLogin(data.email, data.password)
            .then(result => {

                toast.success('User Login Successfully Done.');
                navigate(from, { replace: true });
                // navigate(location?.state ? location.state : '/');
                reset();
                console.log(result.user);
            })
            .catch(error => {
                const errorCode = error.code;

                const errorMessage = error.message;
                if (errorCode) {
                    toast.error('Invalid email or password')
                    return;
                }
                console.log('Error during login:', errorMessage);
            })
    }

    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="flex flex-col md:flex-row justify-center gap-8  py-14">
                <div className="flex w-full md:w-1/2" data-aos="zoom-in ">
                    <div className="w-full  p-4 rounded-lg shadow-xl sm:p-8 dark:bg-gray-50 dark:text-gray-800 bg-opacity-60">
                        <h2 className="mb-3 text-3xl lg:text-4xl font-semibold text-center">Login to your account</h2>
                        <p className="text-base text-center dark:text-gray-600">Don't have account?
                            <Link to='/register' rel="noopener noreferrer" className="focus:underline hover:underline font-bold ml-1 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text">Register here</Link>
                        </p>
                        <div className="my-6 space-y-4 ">
                            <Google></Google>
                        </div>
                        <div className="flex items-center w-full my-4">
                            <hr className="w-full dark:text-gray-600" />
                            <p className="px-3 dark:text-gray-600">OR</p>
                            <hr className="w-full dark:text-gray-600" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="block text-lg font-semibold">Email address</label>
                                    <input
                                        type="email"
                                        // name="email" 
                                        {...register("email", { required: true })}
                                        placeholder="Enter Email Address:" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                                    {errors.email?.type === "required" && <span className="text-red-500">Please enter email address.</span>}
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <label className="text-lg font-semibold">Password</label>
                                        <a rel="noopener noreferrer" href="#" className="text-base font-normal hover:underline dark:text-gray-600">Forgot password?</a>
                                    </div>
                                    <div className="relative">
                                        {/* <div className=""> */}
                                        <input
                                            type={showPassword ? "text" : "password"} name="password"
                                            {...register("password", { required: true })}
                                            placeholder="Enter Password"
                                            className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />

                                        <span onClick={() => setShowPassword(!showPassword)} className="absolute bottom-[10px] right-4 cursor-pointer text-2xl">
                                            {
                                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                            }
                                        </span>
                                        {/* </div> */}

                                    </div>
                                    {errors.password?.type === "required" && <span className="text-red-500">Please enter password.</span>}
                                </div>
                            </div>
                            <input type="submit" value='Login' className="w-full font-medium px-3 py-2  border rounded-md dark:border-gray-300 focus:dark:border-violet-600 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg cursor-pointer" />
                        </form>
                    </div>
                </div>
                <div className="w-full md:w-1/2 hidden md:flex">
                    <img className="w-full h-full" src={login} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;