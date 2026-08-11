import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaShare, FaComment } from "react-icons/fa";
import { fetchReelById } from "../store/reelSlice";
import { selectCurrentReel, selectReelLoading } from "../store/reelSelectors";
import reelApi from "../services/reel.api";
import api from "../../../config/api";

const ReelDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
const [comment, setComment] = useState("");
  const reel = useSelector(selectCurrentReel);
  const loading = useSelector(selectReelLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchReelById(id));
    }
  }, [id, dispatch]);

const sendComment = async () => {
    try {
        const reelId = reel.id || reel._id;

        await api.post(`/reels/${reelId}/comment`, {
            text: comment
        });

        setComment("");

        // reload reel
        dispatch(fetchReelById(reelId));

    } catch (err) {
        console.log(err.response?.data);
    }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Loading reel...
      </div>
    );
  }

  if (!reel) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Reel not found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center">
      {/* Video */}
      <div className="w-full max-w-md aspect-[9/16] bg-black">
        <video
    src={reel.video?.url}
    poster={reel.video?.thumbnail}
    controls
    autoPlay
    loop
    playsInline
    className="w-full h-full object-cover"
/>
      </div>

      {/* Info */}
      <div className="w-full max-w-md p-4 space-y-3">
        {/* User */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
    src={reel.creator?.profilePicture}
    alt=""
    className="w-10 h-10 rounded-full"
/>
            <div>
              <p className="font-semibold text-sm">
    {reel.creator?.username}
</p>
              <p className="text-xs text-gray-400">
    @{reel.creator?.username}
</p>
            </div>
          </div>
        </div>

        {/* Caption */}
        <p className="text-sm text-gray-200">
          {reel.caption}
        </p>

        {/* Actions */}
        <div className="mt-6">

<h3 className="font-bold mb-3">
Comments
</h3>

<div className="flex gap-2 mb-4">

<input
    value={comment}
    onChange={(e) => setComment(e.target.value)}
    className="flex-1 rounded-lg bg-gray-900 p-3"
    placeholder="Write a comment..."
/>

<button
    onClick={() => {
        console.log("BUTTON CLICKED");
        sendComment();
    }}
    className="bg-blue-600 px-4 rounded-lg"
>
    Send
</button>

</div>

<div className="space-y-4">

{reel.comments?.length ? (

reel.comments.map(comment => (

<div
key={comment.id}
className="bg-gray-900 rounded-lg p-3"
>

<strong>

{comment.user?.username}

</strong>

<p className="mt-2">

{comment.text}

</p>

</div>

))

) : (

<p className="text-gray-400">
No comments yet.
</p>

)}

</div>

</div>
      </div>
    </div>
  );
};

export default ReelDetailsPage;