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
    console.log(location);

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state);

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
                // navigate(from, { replace: true });
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
            <div className="flex flex-col md:flex-row justify-center gap-8 my-12">
                <div className="flex w-full md:w-1/2" data-aos="zoom-in ">
                    <div className="w-full  p-4 rounded-lg shadow-xl sm:p-8 dark:bg-gray-50 dark:text-gray-800 bg-opacity-60">
                        <h2 className="mb-3 text-3xl lg:text-4xl font-semibold text-center">Login to your account</h2>
                        <p className="text-base text-center dark:text-gray-600">Don't have account?
                            <Link to='/register' rel="noopener noreferrer" className="focus:underline hover:underline font-bold ml-1 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text">Register here</Link>
                        </p>
                        {/* onClick={handleGooglesignIn} */}
                        <div className="my-6 space-y-4 ">
                            <Google></Google>
                            {/* onClick={handleGithubsignIn} */}
                            <button aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                                    <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                </svg>
                                <p className="text-base font-medium">Login with GitHub</p>
                            </button>
                        </div>
                        <div className="flex items-center w-full my-4">
                            <hr className="w-full dark:text-gray-600" />
                            <p className="px-3 dark:text-gray-600">OR</p>
                            <hr className="w-full dark:text-gray-600" />
                        </div>
                        {/* onSubmit={handleLoginForm} */}
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