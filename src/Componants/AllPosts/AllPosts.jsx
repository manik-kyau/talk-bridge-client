
import { useState } from 'react';
import usePosts from '../../Hooks/usePosts';
import PostCard from '../PostCard/PostCard';
import Select from 'react-select'

const AllPosts = () => {

    const [posts] = usePosts();
    const [selactTag, setSelectTag] = useState(null);
    // console.log(posts);
    const sortedPosts = posts.sort((a, b) => new Date(b.postTime
    ) - new Date(a.postTime
    ));
    console.log(sortedPosts );

    // const tags = Array.from(
    //     new Set(posts.map((res) => res.tag))
    // )

    // const tagOptions = tags.map((tag) => ({
    //     value: tag,
    //     label: tag
    // }))

    // const filterTags = selactTag ? posts.filter((craf) => craf.tag === selactTag.value) : posts;
    return (
        <div className='mb-[100px] px-5 lg:px-0'>
            <div className='text-center space-y-2'>
                <h2 className='text-[40px] font-bold'>All Posts</h2>
                <p className='w-full md:w-2/3 mx-auto text-base font-medium'>Explore the "All Posts" section on Talk Bridge to stay updated with the latest discussions, insights, and stories from around the world. This hub features a diverse range of posts from our global community, showcasing different perspectives and fostering meaningful dialogue.</p>
            </div>
            <div className="mb-3 mt-7 mx-auto">
                <Select
                    // options={tagOptions}
                    isClearable
                    placeholder='Select Tag'
                    onChange={(selectOption) => setSelectTag(selectOption)}
                    value={selactTag}
                    className='w-[450px] border-8 rounded-md text-start text-xl text-bold mx-auto'
                >
                </Select>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                {
                    sortedPosts.map((post, idx) => <PostCard
                        key={idx}
                        post={post}
                    ></PostCard>)
                }
            </div>
        </div>
    );
};

export default AllPosts;