import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
    FaGlobeAfrica,
    FaUserFriends,
    FaLock,
    FaCrown,
    FaEllipsisH
} from "react-icons/fa";

import UserAvatar from "../../user/components/UserAvatar";

const visibilityIcon = {
    public: <FaGlobeAfrica />,
    followers: <FaUserFriends />,
    subscribers: <FaCrown />,
    private: <FaLock />
};

const timeAgo = (date) => {

    if (!date) return "";

    const now = new Date();
    const created = new Date(date);

    const diff =
        Math.floor((now - created) / 1000);

    if (diff < 60)
        return `${diff}s`;

    if (diff < 3600)
        return `${Math.floor(diff / 60)}m`;

    if (diff < 86400)
        return `${Math.floor(diff / 3600)}h`;

    if (diff < 604800)
        return `${Math.floor(diff / 86400)}d`;

    return created.toLocaleDateString();
};

const PostHeader = ({
    creator,
    visibility,
    createdAt,
    onMenu
}) => {

    return (

        <header className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                <Link
                    to={`/profile/${creator?.id}`}
                >

                    <UserAvatar
                        src={creator?.profilePicture}
                        alt={creator?.username}
                        size={48}
                    />

                </Link>

                <div>

                    <Link
                        to={`/profile/${creator?.id}`}
                        className="font-semibold hover:underline"
                    >
                        {creator?.username}
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-gray-500">

                        <span>

                            {timeAgo(createdAt)}

                        </span>

                        <span>

                            •

                        </span>

                        <span
                            className="flex items-center gap-1"
                        >

                            {visibilityIcon[
                                visibility
                            ]}

                            {visibility}

                        </span>

                    </div>

                </div>

            </div>

            <button
                type="button"
                onClick={onMenu}
                className="
                p-2
                rounded-full
                hover:bg-gray-100
                dark:hover:bg-zinc-800
                transition
                "
            >

                <FaEllipsisH />

            </button>

        </header>

    );

};

PostHeader.propTypes = {

    creator: PropTypes.shape({

        id: PropTypes.string,

        username: PropTypes.string,

        profilePicture: PropTypes.string

    }),

    visibility: PropTypes.oneOf([
        "public",
        "followers",
        "subscribers",
        "private"
    ]),

    createdAt: PropTypes.string,

    onMenu: PropTypes.func

};

PostHeader.defaultProps = {

    creator: null,

    visibility: "public",

    createdAt: "",

    onMenu: () => {}

};

export default memo(PostHeader);