
const Banner = () => {
    return (
        <div>
            <div className="background h-[630px] md:h-[700px] mb-[100px]">
                <div className="bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] h-full py-[100px] px-[32px] md:py-[150px] md:px-[100px]">
                    <div className="md:w-2/3 space-y-8">
                        <h2 className="text-5xl font-bold text-white"> Connecting People, Creating Opportunities</h2>
                        <p className="text-lg font-medium text-white">Talk Bridge is a cutting-edge platform designed to bridge communication gaps and unite individuals globally. With real-time translation and high-quality audio, it ensures seamless conversations across languages and cultures. Join Talk Bridge to expand your network and unlock new opportunities worldwide.</p>

                        <form className="pt-3">
                            <div className="flex bg-white rounded-r-[10px] rounded-l-md w-[350px] md:w-[400px]">
                                <input id="name" type="text" placeholder="Search" required="" className="px-3 py-2 rounded focus:outline-none w-[250px] md:w-[300px] focus:dark:ring-violet-600 dark:bg-gray-100  rounded-r-none" />
                                <button className="btn rounded-l-none bg-gradient-to-r from-[#7E90FE] to-[#9873FF] text-white text-lg  border-0 px-6 md:px-8">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;