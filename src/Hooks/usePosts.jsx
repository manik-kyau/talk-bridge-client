import { useEffect, useState } from "react";


const usePosts = (search,currentPage,postPerPage) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(search);
    // console.log(posts);

    useEffect(() => {
        fetch(`http://localhost:5000/posts?page=${currentPage}&size=${postPerPage}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false)
            })
    }, [search,currentPage,postPerPage])
    return [posts, loading];
};

export default usePosts;