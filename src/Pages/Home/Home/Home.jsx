import { Helmet } from "react-helmet-async";
import Banner from "../../../Componants/Banner";
import AllPosts from "../../../Componants/AllPosts/AllPosts";

const Home = () => {
    return (
        <>
        <Helmet>
            <title>TalkBridge | Home</title>
        </Helmet>
            <div>
                <Banner></Banner>
                <AllPosts></AllPosts>
            </div>
        </>
    );
};

export default Home;