import { useLoaderData, useParams } from "react-router-dom";
// import { BiLogoTelegram } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import Modal from "../../Componants/Modal/Modal";
// import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { TbShare3 } from "react-icons/tb";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";


const PostDetails = () => {

    // const currentPageUrl = `http://localhost:5173/postDetrails/${_id}`;
    const currentPageUrl = window.location.href;
    const { user } = useAuth();
    // const [posts,setPosts] = useState([]);

    const posts = useLoaderData();
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/posts2`)
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         setPosts(data);
    //     })
    // },[user])
    console.log(posts);

    console.log('hellow');
    const { id } = useParams();
    console.log(id);
    const axiosSecure = useAxiosSecure()
    
    const [clicked, setClicked] = useState(false);
    const [comments, setComments] = useState([])

    const singlePost = posts?.find(post => post._id === id);
    const { _id, authorImage, authorName, postDescription, postTime, postTitle, tag, upVote, downVote, authorEmail } = singlePost || {};
    console.log(singlePost);
    // const [upCount, setUpCount] = useState(upVote)
    // const [downCount, setDownCount] = useState(downVote)
    // console.log("upVote count",upCount);

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            console.log('Button clicked!');
        }
    };

    const handleUpVote = async () => {
        const totalUpVote = {
            upVote: upVote + 1,
            downVote: downVote,
        }
        const voteRes = await axiosSecure.patch(`/posts/${_id}`, totalUpVote)
        console.log(voteRes.data);
        if (voteRes.data.modifiedCount > 0) {
            toast.success('Your vote successfully Done.')
        }
    }

    const handleDownVote = async() => {
        const totalDownVote = {
            upVote: upVote,
            downVote: downVote + 1,
        }
        const voteRes = await axiosSecure.patch(`/posts/${_id}`, totalDownVote)
        console.log(voteRes.data);
        if (voteRes.data.modifiedCount > 0) {
            toast.success('Your vote successfully Done.')
        }
    }

    // comment 
    useEffect(() => {
        fetch(`http://localhost:5000/comments?postId=${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setComments(data)
            })
    }, [])

    // console.log(singlePost);
    return (
        <div className="pt-[100px] pb-[50px]">
            <div className="w-3/4 mx-auto space-y-3 text-center">

                <h2 className="text-4xl font-bold pb-2">{postTitle}</h2>
                <p className="text-base font-semibold">{postDescription}</p>
                <div>

                    <div className="flex justify-between w-[355px] mx-auto">
                        <p>
                            <span className="text-lg font-semibold">Tag:</span>
                            <span className="text-base font-semibold ml-2">{tag}</span>
                        </p>

                        <p>
                            <span className="text-lg font-semibold">Date:</span>
                            <span className="text-base font-semibold ml-2">{postTime?.slice(0, 10)}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 my-7 text-start w-[355px] mx-auto">
                        <img className="h-[60px] w-[60px] rounded-lg" src={authorImage} alt="" />
                        <div className="text-base font-bold">
                            <p>{authorName}</p>
                            <p>{authorEmail}</p>
                        </div>
                    </div>

                    <hr />

                    <div className="flex justify-center space-x-3 my-5">
                        <button onClick={() => {
                            handleClick()
                            handleUpVote()
                            // setUpCount((upCount) => upCount + 1)
                        }}
                            disabled={clicked}
                            className="btn text-lg">UpVote <FaArrowTrendUp></FaArrowTrendUp></button>
                        <button
                            onClick={() => {
                                handleClick()
                                handleDownVote()
                                // setDownCount((downCount) => downCount + 1)
                            }}
                            disabled={clicked}
                            className="btn text-lg">DownVote <FaArrowTrendDown></FaArrowTrendDown></button>

                        <Modal singlePost={singlePost}></Modal>
                        {/* Share */}
                        <TwitterShareButton
                            url={currentPageUrl}
                            quote='Please share this post'
                        >
                            <button className="btn text-lg"><TbShare3 /> Share</button>
                        </TwitterShareButton>
                    </div>

                    <div>
                        <h2 className="text-start text-xl font-bold mb-6">Comments: {comments.length} </h2>

                        <div className="space-y-4">
                            {
                                comments.map((cmmnt, idx) => <div key={idx}>
                                    <div className="flex gap-4 ml-2">
                                        <img className="w-10 h-10 rounded-full" src={cmmnt?.userPhoto} alt="" />

                                        <div className="bg-gray-100 px-3 py-[2px] rounded-xl">
                                            <p className="text-start font-bold">{cmmnt.userName}</p>
                                            <p className="text-sm text-start">{cmmnt.comment}</p>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PostDetails;