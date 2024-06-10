import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const PostCard = ({ post }) => {

    const { _id,authorImage, postTitle, tag, postTime, upVote, downVote } = post;
    return (
        <Link to={`/postDetrails/${_id}`}>
            <div className="border bg-[#F5F4F1] p-5 rounded-lg">
                <img className="h-[100px] w-[100px] rounded-xl" src={authorImage} alt="" />
                <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">{postTitle.slice(0,23)}</h2>
                        <p>{postTime.slice(0,10)}</p>
                    </div>
                    <p><span className="text-base font-bold">Tag:</span> <span className="text-base font-semibold">{tag}</span></p>
                    <div className="flex gap-10">
                        <h2><span className="text-base font-bold">UpVote: </span> <span className="text-base font-semibold">0</span></h2>
                        <h2><span className="text-base font-bold">DownVote:</span> <span className="text-base font-semibold">0</span></h2>
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