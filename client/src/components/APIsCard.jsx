import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const APIsCard = ({ api }) => {
    if (!api) {
        return null;
    }

    return (
        <Link to={api.link || "#"}>
            <div className=" w-52 h-72 bg-[#414848] rounded-lg cursor-pointer transition duration-300 ease-in-out hover:scale-105 hover:bg-[#131417]">
                <div className="w-full h-[75%] flex items-center justify-center">
                    <img
                        src={api.image || "/default-api-image.png"}
                        alt={api.title || "API Image"}
                        className="w-40 h-40 rounded-full"
                        onError={(e) => {
                            e.target.src = "/default-api-image.png";
                        }}
                    />
                </div>
                <div className="w-full h-[25%] flex items-center justify-center text-white">
                    <h1 className="font-semibold text-2xl">{api.title || "Untitled API"}</h1>
                </div>
            </div>
        </Link>
    );
};

APIsCard.propTypes = {
    api: PropTypes.shape({
        link: PropTypes.string,
        image: PropTypes.string,
        title: PropTypes.string,
    }),
};

APIsCard.defaultProps = {
    api: null,
};

export default APIsCard;
