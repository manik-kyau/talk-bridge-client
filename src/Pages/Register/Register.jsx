import { useState } from "react";
import { Helmet } from "react-helmet-async";
import registerImg from '../../assets/images/register.jpg';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import google from '../../assets/images/google.png';
// import { useForm } from "react-hook-form";

const Register = () => {

    const [showPassword, setShowPassword] = useState(false);

    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors },
    // } = useForm();

    return (
        <div>
            <Helmet>
                <title>Register</title>
            </Helmet>
            <div className="flex flex-col md:flex-row my-12">
                <div className="w-1/2 hidden md:block">
                    <img className="h-full" src={registerImg} alt="" />
                </div>
                <section className="md:px-6 dark:text-gray-800 md:w-1/2 " data-aos="flip-down">
                    {/*  */}
                    <form className=" w-full max-w-xl p-8 mx-auto space-y-6 rounded-xl border shadow-lg dark:bg-gray-50 ">
                        <h2 className="w-full text-3xl font-bold leading-tight">Registration Now</h2>
                        <div>
                            <label className="block text-lg font-semibold">Name</label>
                            <input type="text" name='name' placeholder="Your name" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Email</label>
                            <input type="email" name='email' placeholder="Your email" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">PhotoURL</label>
                            <input type="text" name='photo' placeholder="Your photo" className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Password</label>
                            <div className="relative">
                                <input type={showPassword ? "text" : "password"}
                                    name='password'
                                    placeholder="Your Password"
                                    className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute bottom-[10px] right-4 cursor-pointer text-2xl">
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                        </div>

                        <div>
                            <input type="submit" value='Register' className="block w-full p-2 rounded cursor-pointer bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-lg text-white font-semibold" />
                        </div>

                        <div className="flex items-center w-full my-4">
                            <hr className="w-full dark:text-gray-600" />
                            <p className="px-3 dark:text-gray-600">OR</p>
                            <hr className="w-full dark:text-gray-600" />
                        </div>

                        <button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                            <img src={google} alt="" />
                            <p className="text-base font-medium">Login with Google</p>
                        </button>

                        <div>
                            <p className="text-base dark:text-gray-600">Already have an account? Please <Link to='/login' className="focus:underline hover:underline font-bold ml-1 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-transparent bg-clip-text">Log In</Link></p>
                        </div>

                    </form>
                </section>
            </div>
        </div>
    );
};

export default Register;