
const AnnouncementCard = ({ announcement }) => {
    const { authorName, image, title, description } = announcement;
    console.log(announcement);
    return (
        <div className="border">
            <div>
                <h2>{title}</h2>
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