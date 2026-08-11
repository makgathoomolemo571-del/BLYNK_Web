import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHeart,
    FaRegHeart,
    FaComment,
    FaShare
} from "react-icons/fa";

import { useDispatch } from "react-redux";
import {
    likeReel,
    unlikeReel,
    shareReel
} from "../store/reelSlice";

export default function ReelCard({ reel }) {
const navigate = useNavigate();
    const dispatch = useDispatch();

    const [liked, setLiked] = useState(reel?.isLiked ?? false);

    const [likes, setLikes] = useState(
    reel?.stats?.likes || 0
);

  const like = async () => {
    try {

        if (liked) {
            await dispatch(unlikeReel(reel.id)).unwrap();
        } else {
            await dispatch(likeReel(reel.id)).unwrap();
        }

        setLiked(prev => !prev);
        setLikes(prev => liked ? prev - 1 : prev + 1);

    } catch (err) {
        console.error(err);
    }
};

const share = async () => {
    try {

        await dispatch(shareReel(reel.id)).unwrap();

    } catch (err) {

        console.error(err);

    }
};

const comment = () => {

    navigate(`/reels/${reel.id}`);

};


    return(

<div className="absolute inset-0 pointer-events-none">

<div className="absolute bottom-5 left-5 right-24 text-white">

<h3 className="font-bold text-lg">

@{reel.creator?.username}

</h3>

<p className="mt-2">

{reel.caption}

</p>

</div>

<div className="absolute right-4 bottom-8 flex flex-col gap-6 items-center pointer-events-auto">

<button
onClick={like}
className="flex flex-col items-center"
>

{liked
?
<FaHeart
size={30}
className="text-red-500"
/>

:
<FaRegHeart
size={30}
/>

}

<span>

{likes}

</span>

</button>

<button
    onClick={comment}
    className="flex flex-col items-center"
>
    <FaComment size={28}/>

    <span>
        {reel.stats?.comments || 0}
    </span>
</button>

<button
    onClick={share}
    className="flex flex-col items-center"
>
    <FaShare size={28}/>

    <span>
        {reel.stats?.shares || 0}
    </span>
</button>

</div>

</div>

    );

}