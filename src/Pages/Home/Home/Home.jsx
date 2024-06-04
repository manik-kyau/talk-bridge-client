import { Helmet } from "react-helmet-async";
import Banner from "../../../Componants/Banner";

const Home = () => {
    return (
        <>
        <Helmet>
            <title>TalkBridge | Home</title>
        </Helmet>
            <div>
                <Banner></Banner>
            </div>
        </>
    );
};

export default Home;