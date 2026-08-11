import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postApi from "../services/post.api";

export default function EditPostPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [caption, setCaption] = useState("");
    const [visibility, setVisibility] = useState("public");

    const [media, setMedia] = useState([]);
    const [newFiles, setNewFiles] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        loadPost();
    }, []);

   async function loadPost() {
    try {
        setLoading(true);

        const result = await postApi.getById(id);

        console.log(result);

        const post = result.post || result;

        setCaption(post.caption || "");
        setVisibility(post.visibility || "public");
        setMedia(post.media || []);

    } catch (err) {
        console.error(err);
        setError("Unable to load post.");
    } finally {
        setLoading(false);
    }
}
    function removeExistingMedia(index) {
        const copy = [...media];
        copy.splice(index, 1);
        setMedia(copy);
    }

    function removeNewFile(index) {
        const copy = [...newFiles];
        copy.splice(index, 1);
        setNewFiles(copy);
    }

    async function uploadNewMedia() {
        if (!newFiles.length) return [];

        const uploaded = [];

        for (const file of newFiles) {
            const form = new FormData();

            form.append("file", file);
            form.append("module", "post");

            const type = file.type.startsWith("video")
                ? "video"
                : "image";

            form.append("type", type);

            const { data } = await postApi.post(
                "/media/upload",
                form,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            uploaded.push(data.media);
        }

        return uploaded;
    }

    async function savePost(e) {
    e.preventDefault();

    try {
        setLoading(true);

        await postApi.update(id, {
            caption,
            visibility,
            media
        });

        navigate(`/posts/${id}`);

    } catch (err) {
        console.error(err);
        alert(err?.response?.data?.message || "Failed to update post.");
    } finally {
        setLoading(false);
    }
}

    async function deletePost() {
        if (
            !window.confirm(
                "Delete this post permanently?"
            )
        )
            return;

        try {
            setDeleting(true);

            await postApi.delete(`/posts/${id}`);

            alert("Post deleted.");

            navigate("/feed");
        } catch (err) {
            console.error(err);

            alert("Unable to delete post.");
        } finally {
            setDeleting(false);
        }
    }

    if (loading)
        return (
            <div className="p-5">
                Loading...
            </div>
        );

    if (error)
        return (
            <div className="p-5 text-red-600">
                {error}
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Edit Post
            </h1>

            <div className="mb-6">

                <label className="font-semibold block mb-2">
                    Caption
                </label>

                <textarea
                    rows={6}
                    value={caption}
                    onChange={(e) =>
                        setCaption(e.target.value)
                    }
                    className="w-full border rounded-lg p-4"
                    placeholder="Write something..."
                />

            </div>

            <div className="mb-6">

                <label className="font-semibold block mb-2">
                    Visibility
                </label>

                <select
                    value={visibility}
                    onChange={(e) =>
                        setVisibility(e.target.value)
                    }
                    className="border rounded-lg p-3"
                >
                    <option value="public">
                        Public
                    </option>

                    <option value="followers">
                        Followers
                    </option>

                    <option value="private">
                        Private
                    </option>

                </select>

            </div>

            <div className="mb-8">

                <h2 className="font-bold mb-3">
                    Existing Media
                </h2>

                <div className="grid grid-cols-3 gap-4">

                    {media.map((item, index) => (

                        <div
                            key={index}
                            className="border rounded overflow-hidden"
                        >

                            {item.type === "video" ? (
                                <video
                                    src={item.url}
                                    controls
                                />
                            ) : (
                                <img
                                    src={item.url}
                                    alt=""
                                    className="w-full h-40 object-cover"
                                />
                            )}

                            <button
                                onClick={() =>
                                    removeExistingMedia(index)
                                }
                                className="w-full bg-red-600 text-white py-2"
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

            </div>

            <div className="mb-8">

                <label className="font-bold block mb-3">
                    Add Media
                </label>

                <input
                    multiple
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) =>
                        setNewFiles(
                            Array.from(
                                e.target.files
                            )
                        )
                    }
                />

            </div>

            {newFiles.length > 0 && (

                <div className="mb-8">

                    <h2 className="font-bold mb-3">
                        New Files
                    </h2>

                    {newFiles.map((file, index) => (

                        <div
                            key={index}
                            className="flex justify-between items-center border rounded p-3 mb-2"
                        >

                            <span>
                                {file.name}
                            </span>

                            <button
                                onClick={() =>
                                    removeNewFile(index)
                                }
                                className="text-red-600"
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

            )}

            <div className="flex gap-4">

                <button
                    disabled={saving}
                    onClick={savePost}
                    className="bg-purple-700 text-white px-6 py-3 rounded-lg"
                >
                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>

                <button
                    disabled={deleting}
                    onClick={deletePost}
                    className="bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                    {deleting
                        ? "Deleting..."
                        : "Delete Post"}
                </button>

                <button
                    onClick={() => navigate(-1)}
                    className="border px-6 py-3 rounded-lg"
                >
                    Cancel
                </button>

            </div>

        </div>
    );
}