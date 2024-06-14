
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
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-12'>
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