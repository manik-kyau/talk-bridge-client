import { Helmet } from "react-helmet-async";
import Banner from "../../../Componants/Banner";
import AllPosts from "../../../Componants/AllPosts/AllPosts";
import Announcement from "../../../Componants/Announcement/Announcement";

const Home = () => {
    return (
        <>
        <Helmet>
            <title>TalkBridge | Home</title>
        </Helmet>
            <div>
                <Banner></Banner>
                <AllPosts></AllPosts>
                <Announcement></Announcement>
            </div>
        </>
    );
};

export default Home;