
import useAnnouncement from "../../Hooks/useAnnouncement";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";


const Announcement = () => {

    const [announcements] = useAnnouncement();

    return (
        <>
            {
                announcements.length ? <div className='mb-[100px] px-5 lg:px-0'>
                    <div className='text-center space-y-2'>
                        <h2 className='text-[40px] font-bold'>All Announcements</h2>
                        <p className='w-full md:w-2/3 mx-auto text-base font-medium'>Join us on TalkBridge, where meaningful dialogue meets limitless possibilities. Explore diverse topics, share your insights, and connect with a global community of thinkers and doers. Whether you're seeking knowledge, sparking creativity.</p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-12'>
                        {
                            announcements.map((announcement,idx)=><AnnouncementCard key = {idx}
                            announcement={announcement}
                            ></AnnouncementCard>)
                        }
                    </div>
                </div> :''
            }
        </>
    );
};

export default Announcement;