import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useMyPosts = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();

    useEffect(() => {
        fetch(`http://localhost:5000/posts?authorEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyPosts(data);
                setLoading(false)
            })
    }, [])
    return [myPosts, loading];
};

export default useMyPosts;