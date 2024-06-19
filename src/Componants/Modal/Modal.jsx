import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdOutlineModeComment } from "react-icons/md";
import PropTypes from 'prop-types';


const Modal = ({ singlePost }) => {
    // console.log(singlePost);
    const { user } = useAuth();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm();
    const axiosSecure = useAxiosSecure();

    const { _id, authorImage, authorName, postDescription, postTime, postTitle, tag, upVote, downVote, authorEmail } = singlePost;

    const onSubmit = async(data) => {
        // console.log(data);
        const commentText = {
            postTitle: postTitle,
            postId: _id,
            comment: data.comment,
            userName: user.displayName,
            userEmail: user.email,
            userPhoto: user.photoURL

        }
        const commentRes = await axiosSecure.post('/comments',commentText)
        console.log(commentRes.data);
        if(commentRes.data.insertedId){
            reset();
        }
    }

    return (
        <span>
            <button className="btn text-lg" onClick={() => document.getElementById('my_modal_3').showModal()}><MdOutlineModeComment className="text-lg" /> Comment</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Comment Your feedback</h3>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <input
                            type="text"
                            name="comment"
                            {...register("comment", { required: true })}
                            placeholder="Comment"
                            className="border outline-none p-2 my-4 rounded-l-md" />
                        <button className="bg-gradient-to-r text-lg rounded-r-md from-[#7E90FE] to-[#9873FF] text-white py-[7px] mt-[40px]  px-4">
                            Comment
                        </button>
                    </form>
                </div>
            </dialog>
        </span>
    );
};
Modal.propTypes = {
    singlePost: PropTypes.object.isRequired,
}

export default Modal;