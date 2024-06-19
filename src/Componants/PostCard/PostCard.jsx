import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";

const PostCard = ({ post }) => {

    const [comments, setComments] = useState([])
    const { _id,authorImage, postTitle, tag, postTime, upVote, downVote } = post;

    useEffect(() => {
        fetch(`http://localhost:5000/comments?postId=${_id}`)
            .then(res => res.json())
            .then(data => setComments(data))
    }, [])
    console.log(comments);
    
    return (
        <Link to={`/postDetrails/${_id}`}>
            <div className="border bg-[#F5F4F1] p-3 rounded-lg">
                <img className="h-[100px] w-[100px] rounded-xl" src={authorImage} alt="" />
                <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">{postTitle.slice(0,23)}</h2>
                        <p>{postTime.slice(0,10)}</p>
                    </div>
                    <p><span className="text-base font-semibold">Tag:</span> <span className="text-base">{tag}</span></p>
                    <div className="flex justify-between">
                        <h2><span className="text-base font-semibold">UpVote: </span> <span className="text-base">0</span></h2>
                        <h2><span className="text-base font-semibold">DownVote:</span> <span className="text-base">0</span></h2>
                        <h2><span className="text-base font-semibold">Comments: </span><span className="text-base">{comments.length}</span></h2>
                    </div>
                </div>
            </div>
        </Link>
    );
};
PostCard.propTypes = {
    post: PropTypes.object.isRequired,
}

export default PostCard;