import { useEffect, useState } from 'react';
import useMyPosts from '../../../Hooks/useMyPosts';
import useAuth from '../../../Hooks/useAuth';
import Banner from '../../../assets/images/bannerimage.jpg';
import ProfilePostCard from '../ProfilePostCard/ProfilePostCard';
import { Helmet } from 'react-helmet-async';

const UserProfile = () => {

    const { user } = useAuth();
    const [myPosts] = useMyPosts();
    // console.log(useMyPosts);

    const [profile, setProfile] = useState([]);

    const sortedPosts = myPosts.sort((a, b) => new Date(b.postTime
    ) - new Date(a.postTime));
    // console.log(sortedPosts);

    useEffect(() => {
        fetch('https://talk-bridge-server.vercel.app/users')
            .then(res => res.json())
            .then(data => {
                const findMe = data.find(dta => dta.email == user.email);
                // console.log(findMe);
                setProfile(findMe);
            })
    }, [])

    return (
        <div className=''>
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <div className=''>
                <div className='w-[650px] h-[400px] border mx-auto shadow-xl rounded-2xl'>
                    <div className='relative'>
                        <img className='h-[150px] w-full  rounded-t-2xl' src={Banner} alt="" />
                        <img className='h-[120px] w-[120px] absolute left-[40%] top-[58%] rounded-full border-4 border-white' src={profile.image} alt="" />
                    </div>

                    <div className='mt-16 space-y-6'>
                        <div className='space-y-3'>
                            <h2 className={profile.badge === 'Gold' ? "bg-orange-400 text-white w-24 mx-auto text-center py-1 text-lg font-bold rounded-2xl" : "bg-[#7E90FE] text-white w-24 mx-auto text-center py-1 rounded-2xl text-lg"}>{profile.badge}</h2>
                            <p className='text-center text-lg font-semibold'>User Id: {profile._id}</p>
                        </div>

                        <div className='flex justify-between px-5'>
                            <div>
                                <h2 className='text-base font-semibold'>Name:</h2>
                                <h2 className='text-lg font-semibold'>{profile.name}</h2>
                            </div>
                            <div className=''>
                                <h2 className='text-base font-semibold'>Email:</h2>
                                <h2 className='text-lg font-semibold'>{profile.email}</h2>
                            </div>
                            <div className='flex items-center'>
                                <button className='btn bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-base font-semibold'>Update Profile</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {
                myPosts.length > 0 &&
                <div className='mt-16'>
                    <h2 className='text-2xl font-bold text-center mb-4'>Recent 3 Posts</h2>
                    <div className='grid grid-cols-3 gap-5 mb- mt-8'>
                        {
                            sortedPosts.slice(0, 3).map((resentPost, idx) =><ProfilePostCard 
                            key={idx}
                            resentPost={resentPost}
                            ></ProfilePostCard> )
                            
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default UserProfile;