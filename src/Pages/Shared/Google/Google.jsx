import { useLocation, useNavigate } from 'react-router-dom';
import google from '../../../assets/images/google.png';
import useAuth from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
const Google = () => {

    const { googleLogin } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location);

    const from = location.state?.from?.pathname || "/";
    // console.log('state in the location login page', location.state);
    const handleGoogleLogin = () => {
        // console.log('connected');
        googleLogin()
            .then(result => {
                const googleUser = result.user;
                console.log(googleUser);
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL,
                    badge: 'bronze',
                }
                
                axiosPublic.post('/users',userInfo)
                .then(res =>{
                    console.log(res.data);
                    navigate(from, { replace: true });
                    toast.success("Login Successfully Done.")
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
            <img src={google} alt="" />
            <p className="text-base font-medium">Login with Google</p>
        </button>
    );
};

export default Google;