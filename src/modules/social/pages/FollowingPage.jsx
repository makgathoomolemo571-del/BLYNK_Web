// modules/social/pages/FollowingPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FollowingCard from "../components/FollowingCard";

import { getFollowing } from "../store/socialActions";
import {
    selectFollowing,
    selectSocialLoading,
    selectSocialError
} from "../store/socialSelectors";

const FollowingPage = () => {

    const dispatch = useDispatch();

    const following =
        useSelector(selectFollowing);

    const loading =
        useSelector(selectSocialLoading);

    const error =
        useSelector(selectSocialError);

    useEffect(() => {

        dispatch(
            getFollowing()
        );

    }, [dispatch]);

    if (loading) {

        return (
            <div className="flex justify-center items-center h-full p-10">
                <span className="text-gray-500">
                    Loading following...
                </span>
            </div>
        );

    }

    if (error) {

        return (
            <div className="flex justify-center items-center h-full p-10">
                <span className="text-red-500">
                    {error}
                </span>
            </div>
        );

    }

    return (

        <section className="max-w-5xl mx-auto px-4 py-6">

            <div className="mb-6">

                <h1 className="text-2xl font-bold">
                    Following
                </h1>

                <p className="text-gray-500 mt-1">
                    Accounts you currently follow.
                </p>

            </div>

            {

                following.length === 0 ?

                (

                    <div className="bg-white rounded-xl shadow p-8 text-center">

                        <p className="text-gray-500">

                            You're not following anyone yet.

                        </p>

                    </div>

                )

                :

                (

                    <div className="grid gap-4">

                        {

                            following.map(user => (

                                <FollowingCard

                                    key={user.id}

                                    user={user}

                                />

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

};

export default FollowingPage;