import { useCallback, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FaBell, FaCheck } from "react-icons/fa";
import { useDispatch } from "react-redux";

import podcastApi from "../services/podcast.api";
import { updatePodcast } from "../store/podcastSlice";

const PodcastSubscribeButton = ({
    podcast,
    currentUserId,
    onChange
}) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const subscribed = useMemo(() => {

        if (!podcast?.subscribers)
            return false;

        return podcast.subscribers.some(
            (id) => String(id) === String(currentUserId)
        );

    }, [
        podcast,
        currentUserId
    ]);

    const handleClick = useCallback(async () => {

        if (loading) return;

        setLoading(true);

        try {

            let response;

            if (subscribed) {

                response =
                    await podcastApi.unsubscribe(
                        podcast.id
                    );

            } else {

                response =
                    await podcastApi.subscribe(
                        podcast.id
                    );

            }

            dispatch(
                updatePodcast(response)
            );

            if (onChange)
                onChange(response);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }, [
        loading,
        subscribed,
        podcast,
        dispatch,
        onChange
    ]);

    return (

        <button

            type="button"

            onClick={handleClick}

            disabled={loading}

            className={`
                flex
                items-center
                gap-2
                rounded-xl
                px-5
                py-2.5
                font-semibold
                transition-all
                duration-200
                ${subscribed
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"}
                disabled:opacity-50
                disabled:cursor-not-allowed
            `}
        >

            {

                subscribed

                    ? <FaCheck />

                    : <FaBell />

            }

            {

                loading

                    ? "Please wait..."

                    : subscribed

                        ? "Subscribed"

                        : "Subscribe"

            }

        </button>

    );

};

PodcastSubscribeButton.propTypes = {

    podcast: PropTypes.shape({

        id: PropTypes.string.isRequired,

        subscribers: PropTypes.array

    }).isRequired,

    currentUserId: PropTypes.string.isRequired,

    onChange: PropTypes.func

};

export default PodcastSubscribeButton;