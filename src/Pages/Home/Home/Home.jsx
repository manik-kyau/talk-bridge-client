import { Helmet } from "react-helmet-async";
import Banner from "../../../Componants/Banner";
import AllPosts from "../../../Componants/AllPosts/AllPosts";
import Announcement from "../../../Componants/Announcement/Announcement";
import { useState } from "react";

const Home = () => {

    const [search, setSearch] = useState('');

    const handleSearch = (e) =>{
        e.preventDefault();
        const search = e.target.search.value;
        // console.log(search);
        setSearch(search)
    }

    return (
        <>
        <Helmet>
            <title>TalkBridge | Home</title>
        </Helmet>
            <div>
                <Banner handleSearch={handleSearch}></Banner>
                <AllPosts search={search}></AllPosts>
                <Announcement></Announcement>
            </div>
        </>
    );
};

export default Home;