import { useLoaderData, useParams } from "react-router-dom";
// import { BiLogoTelegram } from "react-icons/bi";
import { useEffect, useState } from "react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import Modal from "../../Componants/Modal/Modal";
// import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { TbShare3 } from "react-icons/tb";


const PostDetails = () => {

    // const currentPageUrl = `http://localhost:5173/postDetrails/${_id}`;
    const currentPageUrl = window.location.href;

    const posts = useLoaderData();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure()
    const [upCount, setUpCount] = useState(0)
    const [downCount, setDownCount] = useState(0)
    const [clicked, setClicked] = useState(false);
    const [comments, setComments] = useState([])

    const singlePost = posts.find(post => post._id === id);
    const { _id, authorImage, authorName, postDescription, postTime, postTitle, tag, upVote, downVote, authorEmail } = singlePost;

    const handleClick = () => {
        if (!clicked) {
            setClicked(true);
            console.log('Button clicked!');
        }
    };

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
            <div className="w-3/4 border mx-auto space-y-3 text-center">

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
                            <span className="text-base font-semibold ml-2">{postTime.slice(0, 10)}</span>
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
                        <button onClick={handleClick}
                            disabled={clicked}
                            className="btn text-lg">UpVote: <FaArrowTrendUp></FaArrowTrendUp></button>
                        <button onClick={() => setDownCount((downCount) => downCount + 1)} className="btn text-lg">DownVote: <FaArrowTrendDown></FaArrowTrendDown></button>

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