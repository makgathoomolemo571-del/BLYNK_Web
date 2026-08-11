// src/modules/messages/components/MessageInput.jsx

import { useState, useRef } from "react";
import {
    FiSend,
    FiPaperclip,
    FiX
} from "react-icons/fi";

import messageApi from "../services/message.api";

export default function MessageInput({

    conversationId,

    replyTo = null,

    onMessageSent,

    disabled = false

}) {

    const fileRef = useRef(null);

    const [text, setText] = useState("");

    const [sending, setSending] = useState(false);

    const [attachment, setAttachment] = useState(null);

    const [preview, setPreview] = useState("");

    function chooseFile() {
        fileRef.current.click();
    }

    function removeAttachment() {

        setAttachment(null);

        setPreview("");

        fileRef.current.value = "";

    }

    function handleFile(e) {

        const file = e.target.files[0];

        if (!file) return;

        setAttachment(file);

        if (file.type.startsWith("image/")) {

            setPreview(
                URL.createObjectURL(file)
            );

        }

    }

    async function send(e) {

        e.preventDefault();

        if (
            !text.trim() &&
            !attachment
        ) return;

        try {

            setSending(true);

            let uploaded = null;

            if (attachment) {

                uploaded =
                    await messageApi.uploadAttachment(
                        attachment
                    );

            }

            const payload = {

                conversationId,

                text,

                attachment:
                    uploaded?.data?._id ||

                    uploaded?._id ||

                    null

            };

            let result;

            if (replyTo) {

                result =
                    await messageApi.reply(
                        replyTo,
                        payload
                    );

            } else {

                result =
                    await messageApi.create(
                        payload
                    );

            }

            setText("");

            removeAttachment();

            onMessageSent?.(
                result.data || result
            );

        } catch (err) {

            console.error(err);

            alert(

                err.response?.data?.message ||

                "Unable to send message."

            );

        } finally {

            setSending(false);

        }

    }

    return (

        <form

            onSubmit={send}

            className="border-t bg-white dark:bg-zinc-950 p-4"

        >

            {preview && (

                <div className="mb-3 relative inline-block">

                    <img

                        src={preview}

                        alt="preview"

                        className="w-28 h-28 object-cover rounded-lg"

                    />

                    <button

                        type="button"

                        onClick={removeAttachment}

                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"

                    >

                        <FiX />

                    </button>

                </div>

            )}

            <div className="flex items-end gap-3">

                <button

                    type="button"

                    onClick={chooseFile}

                    className="p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"

                >

                    <FiPaperclip size={20} />

                </button>

                <input

                    ref={fileRef}

                    hidden

                    type="file"

                    onChange={handleFile}

                />

                <textarea

                    rows={1}

                    value={text}

                    disabled={disabled}

                    onChange={(e)=>

                        setText(e.target.value)

                    }

                    placeholder="Type a message..."

                    className="flex-1 resize-none rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"

                />

                <button

                    disabled={sending}

                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3"

                >

                    <FiSend />

                </button>

            </div>

        </form>

    );

}