import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const ProfilePostCard = ({resentPost}) => {
    const [comments, setComments] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/comments?postId=${resentPost._id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data);
                console.log(data);
            })
    }, [])
    return (
        <Link
            to={`/postDetrails/${resentPost._id}`}
        >
            <div className="border bg-[#c4c1ba] p-2 rounded-lg">
                <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold">{resentPost.postTitle.slice(0, 23)}</h2>
                        <p><span className="text-base font-medium">{resentPost.postTime.slice(0, 10)}</span></p>
                    </div>
                    <p>
                        <span className="text-base font-semibold mr-2">Tag:</span>
                        <span className="text-base font-medium">{resentPost.tag}</span>
                    </p>
                    <div className="flex justify-between">
                        <h2>
                            <span className="text-base font-semibold mr-1">UpVote: </span>
                            <span className="text-base font-medium">{resentPost?.upVote}</span>
                        </h2>
                        <h2>
                            <span className="text-base font-semibold mr-1">DownVote:</span>
                            <span className="text-base font-medium">{resentPost?.downVote}</span>
                        </h2>
                        <h2>
                            <span className="text-base font-semibold mr-1">Comments:</span>
                            <span className="text-base font-medium">{comments.length}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    );
};
ProfilePostCard.propTypes = {
    resentPost: PropTypes.object.isRequired,
}
export default ProfilePostCard;