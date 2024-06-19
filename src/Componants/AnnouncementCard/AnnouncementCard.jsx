
const AnnouncementCard = ({ announcement }) => {
    const { authorName, image, title, description } = announcement;
    // console.log(announcement);
    return (
        <div className="border">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p>{description}</p>
            </div>
            <div>
                <img src="" alt="" />
                <h2></h2>
            </div>
        </div>
    );
};

export default AnnouncementCard;