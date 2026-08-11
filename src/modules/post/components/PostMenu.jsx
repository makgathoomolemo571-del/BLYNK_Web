// modules/post/components/PostMenu.jsx
import { useDispatch } from "react-redux";
import { deletePostAsync } from "../store/postSlice";
import { memo, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  MoreVertical,
  Edit3,
  Trash2,
  Flag,
  Bookmark,
  Share2,
  EyeOff,
  Copy,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import postApi from "../services/post.api";

const PostMenu = ({
  post,
  onDeleted,
  onUpdated,
}) => {
  const navigate = useNavigate();
const dispatch=useDispatch();
  const currentUser = useSelector(
    (state) => state.auth.user
  );

  const [loading, setLoading] =
    useState(false);

  const [open, setOpen] =
    useState(false);

 const isOwner = useMemo(() => {
  const currentId = currentUser?.id || currentUser?._id;
  const creatorId = post?.creator?.id || post?.creator?._id;

  return currentId === creatorId;
}, [currentUser, post]);

  const close = () => setOpen(false);

  const handleDelete=async()=>{

if(!window.confirm("Delete this post?"))
return;

try{

setLoading(true);

await dispatch(
deletePostAsync(post.id)
).unwrap();

close();

}catch(err){

console.error(err);

}finally{

setLoading(false);

}

};

  const handleReport = async()=>{

const reason =
prompt("Why are you reporting this post?");

if(!reason)return;


await postApi.report(
post.id,
reason
);

close();

};

  const handleShare = async () => {
    try {
      await postApi.share(post.id);

      if (navigator.share) {
        navigator.share({
          url:
            window.location.origin +
            "/posts/" +
            post.id,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.origin +
            "/posts/" +
            post.id
        );
      }

      close();
    } catch {}
  };

  const handleSave = async () => {
    try {
      await postApi.save(post.id);

      close();
    } catch {}
  };

  const handleHide = async () => {
    try {
      await postApi.hide(post.id);

      close();
    } catch {}
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      window.location.origin +
        "/posts/" +
        post.id
    );

    close();
  };

  const editHandle = async (e) => {
    e.preventDefault();

    try {
        await api.patch(`/posts/${id}`, {
            caption,
            visibility
        });

        navigate(`/posts/${id}`);
    } catch (err) {
        console.error(err);
    }
};

  

  return (
    <div className="relative">

      <button
        type="button"
        onClick={() =>
          setOpen(!open)
        }
        className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-60 rounded-xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

          {isOwner && (
            <>
              <button
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => {
                  navigate(
                    `/posts/${.id}/edit`
                  );

                  close();
                }}
              >
                <Edit3 size={18} />
                Edit Post
              </button>

              <button
                disabled={loading}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleDelete}
              >
                <Trash2 size={18} />
                Delete Post
              </button>
            </>
          )}

          <button
            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={handleSave}
          >
            <Bookmark size={18} />
            Save
          </button>

          <button
            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={handleShare}
          >
            <Share2 size={18} />
            Share
          </button>

          <button
            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={handleCopy}
          >
            <Copy size={18} />
            Copy Link
          </button>

          {!isOwner && (
            <>
              <button
                className="flex w-full items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={handleHide}
              >
                <EyeOff size={18} />
                Hide Post
              </button>

              <button
                className="flex w-full items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleReport}
              >
                <Flag size={18} />
                Report
              </button>
            </>
          )}

        </div>
      )}
    </div>
  );
};

PostMenu.propTypes = {
  post: PropTypes.object.isRequired,
  onDeleted: PropTypes.func,
  onUpdated: PropTypes.func,
};

export default memo(PostMenu);