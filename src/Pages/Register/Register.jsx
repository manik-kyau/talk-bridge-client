import { useState } from "react";
import { Helmet } from "react-helmet-async";
import registerImg from '../../assets/images/register.jpg';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import google from '../../assets/images/google.png';
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import Google from "../Shared/Google/Google";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Register = () => {

    const axiosPublic = useAxiosPublic();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const { createUser, updateUserProfile, logOut } = useAuth();

    const onSubmit = (data) => {
        // console.log(data);

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                logOut();
                // console.log(result.user);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('profile updated');
                        // create user entry in the database

                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL,
                            badge: 'bronze',
                        }
                        axiosPublic.post('/users',userInfo)
                        .then(res => {
                            if(res.data.insertedId){
                                toast.success("Registration Successfully Done.");
                                navigate("/login");
                                reset();
                            }
                        })
                    })
                    .catch(error => console.log(error))
            })
            .catch(error => {
                console.log(error);
                toast.error("User already created!")
            })
    }

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
                    <form onSubmit={handleSubmit(onSubmit)} className=" w-full max-w-xl p-8 mx-auto space-y-6 rounded-xl border shadow-lg dark:bg-gray-50 ">
                        <h2 className="w-full text-3xl font-bold leading-tight">Registration Now</h2>
                        <div>
                            <label className="block text-lg font-semibold">Name</label>
                            <input
                                type="text"
                                // name='name'
                                {...register("name", { required: true })}
                                placeholder="Your name"
                                className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                            {errors.name?.type === "required" && <span className="text-red-500">Please enter your name.</span>}
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Email</label>
                            <input
                                type="email"
                                // name='email'
                                {...register("email", { required: true })}
                                placeholder="Your email"
                                className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                            {errors.email?.type === "required" && <span className="text-red-500">Please enter email address.</span>}
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">PhotoURL</label>
                            <input
                                type="text"
                                {...register("photoURL", { required: true })}
                                // name='photo'
                                placeholder="Your photo"
                                className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />
                            {errors.photoURL?.type === "required" && <span className="text-red-500">Please enter photo url.</span>}
                        </div>
                        <div>
                            <label className="block text-lg font-semibold">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    // name='password'
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })}
                                    placeholder="Your Password"
                                    className="block w-full p-2 rounded focus:outline-none focus:ring focus:ring-opacity-25 focus:dark:ring-violet-600 dark:bg-gray-100 border" />

                                <span onClick={() => setShowPassword(!showPassword)} className="absolute bottom-[10px] right-4 cursor-pointer text-2xl">
                                    {
                                        showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                                    }
                                </span>
                            </div>
                            {errors.password?.type === "required" && <span className="text-red-500">Please enter password.</span>}
                            {errors.password?.type === "minLength" && <span className="text-red-500">Password must be 6 charecters.</span>}
                            {errors.password?.type === "maxLength" && <span className="text-red-500">Password must be less than 20 charecters.</span>}
                            {errors.password?.type === "pattern" && <span className="text-red-500">Password must have one uppercase,lowercase,number and special charecter.</span>}
                        </div>

                        <div>
                            <input type="submit" value='Register' className="block w-full p-2 rounded cursor-pointer bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-lg text-white font-semibold" />
                        </div>

                        <div className="flex items-center w-full my-4">
                            <hr className="w-full dark:text-gray-600" />
                            <p className="px-3 dark:text-gray-600">OR</p>
                            <hr className="w-full dark:text-gray-600" />
                        </div>

                        <Google></Google>
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