import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const useMyPosts = () => {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const {user} = useAuth();

    useEffect(() => {
        fetch(`https://talk-bridge-server.vercel.app/specificPosts?authorEmail=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setMyPosts(data);
                setLoading(false)
            })
    }, [])
    return [myPosts, loading];
};

export default useMyPosts;