// modules/social/pages/BlockedUsersPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getBlockedUsers } from "../store/socialActions";

import {
    selectBlockedUsers,
    selectSocialLoading
} from "../store/socialSelectors";

const BlockedUsersPage = () => {

    const dispatch = useDispatch();

    const blockedUsers =
        useSelector(selectBlockedUsers);

    const loading =
        useSelector(selectSocialLoading);

    useEffect(() => {
        dispatch(getBlockedUsers());
    }, [dispatch]);

    const handleUnblock = (id) => {
        dispatch(unblockUser(id));
    };

    if (loading) {
        return (
            <div className="p-6 text-center">
                Loading blocked users...
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">

            <h1 className="text-2xl font-bold mb-6">
                Blocked Users
            </h1>

            {
                blockedUsers.length === 0 && (

                    <div className="bg-white rounded-xl shadow p-6 text-center">

                        You haven't blocked anyone.

                    </div>

                )
            }

            <div className="space-y-4">

                {

                    blockedUsers.map((user) => (

                        <div
                            key={user.id}
                            className="bg-white rounded-xl shadow flex items-center justify-between p-4"
                        >

                            <div className="flex items-center gap-4">

                                <img
                                    src={user.profilePicture}
                                    alt={user.username}
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>

                                    <h3 className="font-semibold">
                                        {user.username}
                                    </h3>

                                </div>

                            </div>

                            <button
                                onClick={() => handleUnblock(user.id)}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                            >

                                Unblock

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>
    );

};

export default BlockedUsersPage;