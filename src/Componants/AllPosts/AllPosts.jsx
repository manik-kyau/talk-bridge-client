
import usePosts from '../../Hooks/usePosts';
import PostCard from '../PostCard/PostCard';

const AllPosts = () => {

    const [posts] = usePosts();
    console.log(posts);
    return (
        <div className='mb-[100px] '>
            <div className='text-center space-y-2'>
                <h2 className='text-[40px] font-bold'>All Posts</h2>
                <p className='w-full md:w-2/3 mx-auto text-base font-medium'>Explore the "All Posts" section on Talk Bridge to stay updated with the latest discussions, insights, and stories from around the world. This hub features a diverse range of posts from our global community, showcasing different perspectives and fostering meaningful dialogue.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                    posts.map((post, idx) => <PostCard
                        key={idx}
                        post={post}
                    ></PostCard>)
                }
            </div>
        </div>
    );
};

export default AllPosts;