// modules/social/pages/FriendsPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FriendCard from "../components/FriendCard";

import { getFriends } from "../store/socialActions";

import {
    selectFriends,
    selectSocialLoading,
    selectSocialError
} from "../store/socialSelectors";

const FriendsPage = () => {

    const dispatch = useDispatch();

    const friends = useSelector(
        selectFriends
    );

    const loading = useSelector(
        selectSocialLoading
    );

    const error = useSelector(
        selectSocialError
    );

    useEffect(() => {

        dispatch(
            getFriends()
        );

    }, [dispatch]);

    if (loading) {
        return (
            <div className="p-6">
                Loading friends...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-red-600">
                {error}
            </div>
        );
    }

    return (

        <div className="max-w-6xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Friends
            </h1>

            {

                friends.length === 0

                ?

                (

                    <div className="text-gray-500">

                        No friends found.

                    </div>

                )

                :

                (

                    <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-5
                    "
                    >

                        {

                            friends.map(

                                friend => (

                                    <FriendCard

                                        key={friend.id}

                                        friend={friend}

                                    />

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

};

export default FriendsPage;