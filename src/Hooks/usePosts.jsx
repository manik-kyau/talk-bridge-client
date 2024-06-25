import { useEffect, useState } from "react";


const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log(search);
    // console.log(posts);

    useEffect(() => {
        fetch(`https://talk-bridge-server.vercel.app/posts?`)
            .then(res => res.json())
            .then(data => {
                setPosts(data);
                setLoading(false)
            })
    }, [])
    return [posts, loading];
};

export default usePosts;