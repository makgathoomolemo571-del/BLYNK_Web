// StoryRepliesPage.jsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StoryReplies from "../components/StoryReplies";
import storyAPI from "../services/story.api";

export default function StoryRepliesPage() {

    const { id } = useParams();

    const [story, setStory] = useState(null);

    useEffect(() => {

        loadStory();

    }, []);

    const loadStory = async () => {

        const res = await storyAPI.getFeedStories();

        const stories = res.data || res;

        const found = stories.find(
            s => (s.id || s._id) === id
        );

        setStory(found);

    };

    const sendReply = async (storyId, text) => {

        await storyAPI.replyStory(storyId, text);

        loadStory();

    };

    if (!story) return null;

    return (

        <StoryReplies

            storyId={story.id}

            replies={story.replies || []}

            onSendReply={sendReply}

        />

    );

}