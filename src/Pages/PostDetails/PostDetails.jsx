import { useLoaderData, useParams } from "react-router-dom";
import { BiLogoTelegram } from "react-icons/bi";
import { useState } from "react";

const PostDetails = () => {

    const posts = useLoaderData();
    const { id } = useParams();
    const [upCount, setUpCount] = useState(0)
    const [downCount, setDownCount] = useState(0)

    const singlePost = posts.find(post => post._id === id);
    const {authorImage,authorName,postDescription,postTime,postTitle,tag,upVote,downVote,authorEmail} = singlePost;

    // console.log(singlePost);
    return (
        <div className="pt-[110px]">
            <img className="h-[200px] w-[200px]" src={authorImage} alt="" />
            <h2 className="text-2xl">{postTitle}</h2>
            <p>{postDescription}</p>
            <div>
                <input type="text" placeholder="Comment" className="border outline-none p-2 my-4" />
                <button className="bg-gradient-to-r text-lg  from-[#7E90FE] to-[#9873FF] text-white py-[7px] mt-6 px-4">
                    {/* <BiLogoTelegram></BiLogoTelegram> */}
                    Comment
                </button>
                <button onClick={() => setUpCount((upCount) => upCount + 1)} className="btn">UpVote: {upCount}</button>
                <button onClick={() => setDownCount((downCount) => downCount + 1)} className="btn">DownVote: {downCount}</button>
                <button className="btn">Share</button>
            </div>
        </div>
    );
};

export default PostDetails;