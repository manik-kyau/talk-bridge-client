import PropTypes from 'prop-types';

const AnnouncementCard = ({ announcement }) => {
    const { authorName, image, title, description } = announcement;
    // console.log(announcement);
    return (
        <div className="border p-5 bg-slate-100 rounded-xl">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p>{description}</p>
            </div>
            <div className="mt-6 flex items-center gap-4">
                <img className="h-14 w-14 rounded-xl" src={image} alt="" />
                <h2 className="text-base font-semibold">{authorName}</h2>
            </div>
        </div>
    );
};
AnnouncementCard.propTypes = {
    announcement: PropTypes.object.isRequired,
}

export default AnnouncementCard;