import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

import {
    fetchFeed,
    likePost,
    unlikePost,
    sharePost,
    deletePostAsync
} from "../store/postSlice";
import PostCard from "../components/PostCard";
import postApi from "../services/post.api";


export default function FeedPage() {
    const [menuPost,setMenuPost] = useState(null);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.feed);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  const currentUser = useSelector((state) => state.auth.user);



  console.log("Current User:", currentUser);
console.log("Menu Post:", menuPost);
console.log("Creator:", menuPost?.creator);


  const buttonStyle = {
  width: "100%",
  padding: "12px",
  textAlign: "left",
  border: "none",
  background: "white",
  cursor: "pointer"
};

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      {posts.map((post) => (
        <PostCard

key={post.id}

post={post}

onLike={(id) => {
    const post = posts.find(p => p.id === id);

    if (!post) return;

    if (post.liked) {
        dispatch(unlikePost(id));
    } else {
        dispatch(likePost(id));
    }
}}

onComment={(id)=>
navigate(`/posts/${id}`)
}

onShare={(id)=>
dispatch(sharePost(id))
}


onSave={(id)=>{
}}

onMenu={(post)=>{

console.log("MENU CLICKED", post);

setMenuPost(post);

}}
 />
      ))}
{menuPost && (
  <div
    style={{
      position: "fixed",
      top: "80px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "320px",
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 10px 30px rgba(0,0,0,.3)",
      zIndex: 999999999,
      padding: "12px"
    }}
  >

    <button
      style={buttonStyle}
      onClick={() => {
        navigate(`/posts/${menuPost.id}`);
        setMenuPost(null);
      }}
    >
      👁 View Post
    </button>

   <button
  style={buttonStyle}
  onClick={() => {
    navigate(`/posts/${menuPost.id}/edit`);
    setMenuPost(null);
  }}
>
  ✏️ Edit Post
</button>

<button
  style={{
    ...buttonStyle,
    color: "red"
  }}
  onClick={async () => {

    if (!window.confirm("Delete this post?"))
      return;

    await dispatch(deletePostAsync(menuPost.id)).unwrap();

    setMenuPost(null);

    dispatch(fetchFeed());

  }}
>
  🗑 Delete Post
</button>

    <button
      style={buttonStyle}
      onClick={() => {
        dispatch(sharePost(menuPost.id));
        setMenuPost(null);
      }}
    >
      🔄 Repost
    </button>

 <button
  style={buttonStyle}
  onClick={async () => {

    try {

      await postApi.save(menuPost.id);

      alert("Post saved");

    } catch (err) {

      console.error(err);

    }

    setMenuPost(null);

  }}
>
  🔖 Save
</button>

   <button
  style={{
    ...buttonStyle,
    color: "red"
  }}
        onClick={async () => {

    const reason = prompt("Reason for reporting");

    if (!reason) return;

    try {

        await postApi.report(menuPost.id, reason);

        alert("Reported");

    } catch (err) {

        console.error(err);

    }

    setMenuPost(null);

}}
      >
        🚩 Report
      </button>
    

    <button
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "10px"
      }}
      onClick={() => setMenuPost(null)}
    >
      Close
    </button>

  </div>
)}
    </div>
    
  );
}