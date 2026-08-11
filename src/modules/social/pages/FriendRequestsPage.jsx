// modules/social/pages/FriendRequestsPage.jsx

import { useEffect, useState } from "react";
import { Check, X, Clock } from "lucide-react";

import socialApi from "../services/social.api";

const FriendRequestsPage = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            const { data } =
                 await socialApi.getFriendRequests();

            setRequests(data);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    const accept = async (id) => {

        try {

            setProcessing(id);

            await socialApi.acceptFriendRequest(id);

            setRequests((prev) =>
                prev.filter((item) => item.id !== id)
            );

        } catch (err) {

            console.error(err);

        } finally {

            setProcessing("");

        }

    };

    const reject = async (id) => {

        try {

            setProcessing(id);

            await socialApi.rejectFriendRequest(id);

            setRequests((prev) =>
                prev.filter((item) => item.id !== id)
            );

        } catch (err) {

            console.error(err);

        } finally {

            setProcessing("");

        }

    };
console.log(requests);
    if (loading) {

        return (

            <div className="flex justify-center items-center h-[70vh]">

                <Clock className="animate-spin w-8 h-8 text-blue-600" />

            </div>

        );

    }

    return (

        <div className="max-w-3xl mx-auto py-6">

            <h1 className="text-2xl font-bold mb-6">

                Friend Requests

            </h1>

            {

                requests.length === 0 ?

                (

                    <div className="bg-white rounded-xl p-10 text-center shadow">

                        No pending friend requests.

                    </div>

                )

                :

                (

                    <div className="space-y-4">

                        {

                            requests.map((request) => (

                                <div

                                    key={request.id}

                                    className="bg-white rounded-xl shadow p-4 flex justify-between items-center"

                                >

                                    <div className="flex items-center gap-4">

                                        <img src={request.profilePicture} />

                                        <div>

                                            <h3 className="font-semibold">

                                                {request.username}

                                            </h3>

                                            <p className="text-sm text-gray-500">

                                                Wants to be your friend

                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex gap-2">

                                        <button

                                            disabled={
                                                processing === request.id
                                            }

                                            onClick={() =>
          socialApi.acceptFriendRequest(user.requestId)
        }

                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                                        >

                                            <Check size={18} />

                                            Accept

                                        </button>

                                        <button

                                            disabled={
                                                processing === request.id
                                            }

                                            onClick={() =>
                                                reject(request.id)
                                            }

                                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"

                                        >

                                            <X size={18} />

                                            Reject

                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default FriendRequestsPage;