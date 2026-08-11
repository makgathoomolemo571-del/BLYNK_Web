// modules/post/pages/PostDetailsPage.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaHeart,
    FaCommentDots,
    FaShare,
    FaBookmark,
    FaFlag
} from "react-icons/fa";

import postApi from "../services/post.api";

import UserAvatar from "../../user/components/UserAvatar";

const PostDetailsPage = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [menuPost, setMenuPost] = useState(null);

    const [loading, setLoading] = useState(true);

    const [comment, setComment] = useState("");
    const [replyText, setReplyText] = useState({});

    const toggleLike = async () => {

    if (post.liked) {
        await postApi.unlike(id);
    } else {
        await postApi.like(id);
    }

    loadPost();
};

    const loadPost = async () => {

        try {

           const post = await postApi.getById(id);

setPost(post);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadPost();

    }, [id]);

    const like = async () => {

        await postApi.like(id);

        loadPost();

    };

    const unlike = async () => {

        await postApi.unlike(id);

        loadPost();

    };

    

    const share = async () => {

        await postApi.share(id);

        loadPost();

    };

    const report = async () => {

        const reason =
            prompt("Reason");

        if (!reason) return;

        await postApi.report(id, reason);

    };

    const addComment = async () => {

        if (!comment.trim()) return;

        await postApi.comment(
            id,
            comment
        );

        setComment("");

        loadPost();

    };

    if (loading) {

        return (
            <div className="flex justify-center py-20">

                Loading...

            </div>
        );

    }

    if (!post) {

        return (
            <div className="text-center py-20">

                Post not found

            </div>
        );

    }

    return (

        <div className="max-w-3xl mx-auto p-6 space-y-6">

            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-blue-600"
            >

                <FaArrowLeft />

                Back

            </button>

            <div className="bg-white rounded-xl shadow">

                <div className="p-5 flex gap-4">

                    <UserAvatar
                        user={post.creator}
                        size={60}
                    />

                    <div>

                        <h2 className="font-bold">

                            {post.creator.username}

                        </h2>

                        <p className="text-gray-500 text-sm">

                            {new Date(
                                post.createdAt
                            ).toLocaleString()}

                        </p>

                    </div>

                </div>

                {post.caption && (

                    <div className="px-5 pb-4 whitespace-pre-wrap">

                        {post.caption}

                    </div>

                )}

                {post.media?.length > 0 && (

                    <div className="space-y-3">

                        {

                            post.media.map((media) => {

                                if (
                                    media.type ===
                                    "image"
                                ) {

                                    return (

                                        <img
                                            key={media.url}
                                            src={media.url}
                                            alt=""
                                            className="w-full"
                                        />

                                    );

                                }

                                if (
                                    media.type ===
                                    "video"
                                ) {

                                    return (

                                        <video
                                            key={media.url}
                                            src={media.url}
                                            controls
                                            className="w-full"
                                        />

                                    );

                                }

                                if (
                                    media.type ===
                                    "audio"
                                ) {

                                    return (

                                        <audio
                                            key={media.url}
                                            controls
                                            src={media.url}
                                            className="w-full"
                                        />

                                    );

                                }

                                return null;

                            })

                        }

                    </div>

                )}

                <div className="flex justify-around py-4 border-t">

                    <button
    onClick={toggleLike}
    className="flex items-center gap-2"
>
    <FaHeart
        className={
            post.liked
                ? "text-red-500"
                : ""
        }
    />

    {post.stats.likes}
</button>

                    <button
                        onClick={share}
                        className="flex items-center gap-2"
                    >

                        <FaShare />

                        {post.stats.shares}

                    </button>

                    <button
                        onClick={report}
                        className="flex items-center gap-2"
                    >

                        <FaFlag />

                        Report

                    </button>

                </div>

                {menuPost && (

<div className="fixed inset-0 bg-black/40 flex items-end z-50">

<div className="bg-white w-full rounded-t-3xl p-6 space-y-4">

<h3 className="font-bold text-lg">
Post Options
</h3>


<button
    className="w-full text-left p-3 hover:bg-gray-100"
    onClick={async () => {

        try {

            await postApi.save(menuPost.id);

            setMenuPost(null);

            alert("Post saved.");

        } catch (err) {

            console.error(err);

        }

    }}
>
    🔖 Save Post
</button>




<button
className="w-full text-left p-3 text-red-500 hover:bg-gray-100"
onClick={()=>{
    console.log("Delete", menuPost.id);
    setMenuPost(null);
}}
>
🗑 Delete
</button>


<button
className="w-full p-3"
onClick={()=>setMenuPost(null)}
>
Cancel
</button>


</div>

</div>

)}

            </div>

            <div className="bg-white rounded-xl shadow p-5">

                <h3 className="font-bold mb-4">

                    Comments

                </h3>

                <div className="flex gap-2 mb-5">

                    <input
                        value={comment}
                        onChange={(e) =>
                            setComment(
                                e.target.value
                            )
                        }
                        placeholder="Write comment..."
                        className="flex-1 border rounded-lg p-3"
                    />

                    <button
                        onClick={addComment}
                        className="bg-blue-600 text-white rounded-lg px-6"
                    >

                        Send

                    </button>

{
post.comments?.length ? (

<div className="space-y-5 mt-5">

{post.comments.map((item)=>(

<div
key={item.id}
className="bg-gray-50 rounded-xl border p-4"
>

{/* Header */}

<div className="flex items-center justify-between">

<div className="flex items-center gap-3">

<UserAvatar
user={item.user}
size={42}
/>

<div>

<h4 className="font-semibold">
{item.user?.username}
</h4>

<p className="text-xs text-gray-500">
{new Date(item.createdAt).toLocaleString()}
</p>

</div>

</div>

<button
onClick={async()=>{

if(window.confirm("Delete comment?")){

await postApi.deleteComment(
post.id,
item.id
);

loadPost();

}

}}
className="text-red-500 hover:text-red-700 text-sm"
>

Delete

</button>

</div>

{/* Comment */}

<p className="mt-4 whitespace-pre-wrap">

{item.text}

</p>

{/* Actions */}

<div className="flex items-center gap-6 mt-4">

<button
className="text-blue-600 hover:text-blue-800"
onClick={async()=>{

await postApi.likeComment(
post.id,
item.id
);

loadPost();

}}
>

👍 {item.likes.length}

</button>

</div>

{/* Reply */}

<div className="flex gap-2 mt-4">

<input
value={replyText[item.id] || ""}
onChange={(e)=>

setReplyText({

...replyText,

[item.id]:e.target.value

})

}
placeholder="Write a reply..."
className="flex-1 border rounded-lg p-2"
/>

<button
className="bg-blue-600 text-white px-4 rounded-lg"
onClick={async()=>{

const text=replyText[item.id];

if(!text?.trim()) return;

await postApi.reply(
post.id,
item.id,
text
);

setReplyText({

...replyText,

[item.id]:""

});

loadPost();

}}
>

Reply

</button>

</div>

{/* Replies */}

{item.replies?.length>0 &&(

<div className="ml-12 mt-5 space-y-3">

{item.replies.map(reply=>(

<div
key={reply.id}
className="bg-white rounded-lg border p-3 shadow-sm"
>

<div className="flex items-center justify-between">

<div className="flex items-center gap-2">

<UserAvatar
user={reply.user}
size={32}
/>

<div>

<strong>

{reply.user?.username}

</strong>

<p className="text-xs text-gray-400">

{new Date(reply.createdAt).toLocaleString()}

</p>

</div>

</div>

<button
className="text-red-500 text-sm"
onClick={async()=>{

if(window.confirm("Delete reply?")){

await postApi.deleteReply(
post.id,
item.id,
reply.id
);

loadPost();

}

}}
>

Delete

</button>

</div>

<p className="mt-3">

{reply.text}

</p>

<div className="flex items-center gap-5 mt-3">

<button
className="text-blue-600 hover:text-blue-800"
onClick={async()=>{

if(reply.liked){

await postApi.unlikeReply(
post.id,
item.id,
reply.id
);

}else{

await postApi.likeReply(
post.id,
item.id,
reply.id
);

}

loadPost();

}}
>

{reply.liked ? "💙 Unlike" : "🤍 Like"}

</button>

<span className="text-gray-500">

{reply.likes?.length || 0} likes

</span>

</div>

</div>

))}

</div>

)}

</div>

))}

</div>

) : (

<div className="text-gray-500 text-center py-10">

No comments yet.

</div>

)
}

  </div>



                              </div>

                         
          

            </div>


    );

};

export default PostDetailsPage;