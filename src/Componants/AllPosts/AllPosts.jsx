
import { useEffect, useState } from 'react';
import usePosts from '../../Hooks/usePosts';
import PostCard from '../PostCard/PostCard';
import Select from 'react-select'

const AllPosts = () => {

    // const [posts] = usePosts();
    const [posts, setPosts] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [postPerPage, setPostPerPage] = useState(5);
    const { count } = postCount;
    // const postsPerPage = 5;
    const numberOfPages = Math.ceil(count / postPerPage);

    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i)
    }
    // const pages = [...Array(numberOfPages).keys()];
    // console.log(pages);
    // console.log(count);
    // console.log(posts);
    const sortedPosts = posts.sort((a, b) => new Date(b.postTime
    ) - new Date(a.postTime
    ));

    useEffect(() => {
        fetch(`http://localhost:5000/posts?page=${currentPage}&size=${postPerPage}`)
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [currentPage, postPerPage])

    useEffect(() => {
        fetch('http://localhost:5000/postsCount')
            .then(res => res.json())
            .then(data => setPostCount(data))
    }, []);

    const handlePostPerPage = (e) => {
        const intValue = parseInt(e.target.value);
        console.log(intValue);
        setPostPerPage(intValue);
        setCurrentPage(0)
    }

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className='mb-[100px] px-5 lg:px-0'>
            <div className='text-center space-y-2'>
                <h2 className='text-[40px] font-bold'>All Posts</h2>
                <p className='w-full md:w-2/3 mx-auto text-base font-medium'>Explore the "All Posts" section on Talk Bridge to stay updated with the latest discussions, insights, and stories from around the world. This hub features a diverse range of posts from our global community, showcasing different perspectives and fostering meaningful dialogue.</p>
            </div>
            {/* <div className="mb-3 mt-7 mx-auto">
                <Select
                    // options={tagOptions}
                    isClearable
                    placeholder='Select Tag'
                    onChange={(selectOption) => setSelectTag(selectOption)}
                    value={selactTag}
                    className='w-[450px] border-8 rounded-md text-start text-xl text-bold mx-auto'
                >
                </Select>
            </div> */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
                {
                    sortedPosts.map((post, idx) => <PostCard
                        key={idx}
                        post={post}
                    ></PostCard>)
                }
            </div>
            <div className='text-2xl font-semibold text-center mt-10'>
                <button onClick={handlePrevPage} className="btn">Prev</button>
                {
                    pages.map((page, idx) => <button
                        className={currentPage === page ? 'bg-orange-500 btn text-white mx-2' : 'btn mx-2'}
                        onClick={() => setCurrentPage(page)}
                        // className='btn mx-2'
                        key={idx}
                    >{page}</button>)
                }
                <button onClick={handleNextPage} className="btn">Next</button>
                <select value={postPerPage}
                    onChange={handlePostPerPage}
                    name=""
                    className='outline-none text-sm border py-[13px] px-2 bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white ml-2 rounded-md'
                >
                    <option className='text-black' value="5">5</option>
                    <option className='text-black' value="9">9</option>
                    <option className='text-black' value="12">12</option>
                    <option className='text-black' value="15">15</option>
                </select>
            </div>
        </div>
    );
};

export default AllPosts;