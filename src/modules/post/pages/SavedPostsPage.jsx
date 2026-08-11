import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadSavedPosts } from "../store/postActions";
import {
    selectSavedPosts,
    selectPostsLoading,
    selectPostsError
} from "../store/postSelectors";

import PostCard from "../components/PostCard";

const SavedPostsPage = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectSavedPosts);

    const loading = useSelector(selectPostsLoading);

    const error = useSelector(selectPostsError);

    useEffect(() => {
        dispatch(loadSavedPosts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-10">
                {error}
            </div>
        );
    }

    return (

        <div className="max-w-3xl mx-auto px-4 py-6">

            <h1 className="text-3xl font-bold mb-6">
                Saved Posts
            </h1>

            {

                posts.length === 0 ?

                (

                    <div className="text-center text-gray-500 py-20">

                        No saved posts.

                    </div>

                )

                :

                (

                    <div className="space-y-6">

                        {

                            posts.map(post => (

                                <PostCard
                                    key={post.id}
                                    post={post}
                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

};

export default SavedPostsPage;