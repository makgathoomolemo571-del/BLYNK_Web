// src/modules/messages/components/VoiceRecorder.jsx

import { useState, useRef } from "react";
import { Mic, Square, Send } from "lucide-react";
import messageApi from "../services/message.api";

export default function VoiceRecorder({
    onUploaded
}) {

    const recorderRef = useRef(null);

    const chunksRef = useRef([]);

    const [recording, setRecording] =
        useState(false);

    const [uploading, setUploading] =
        useState(false);

    const [audioURL, setAudioURL] =
        useState("");

    const [blob, setBlob] =
        useState(null);

    async function startRecording() {

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true
                });

            const recorder =
                new MediaRecorder(stream);

            recorderRef.current = recorder;

            chunksRef.current = [];

            recorder.ondataavailable = e => {

                if (e.data.size > 0)
                    chunksRef.current.push(e.data);

            };

            recorder.onstop = () => {

                const audioBlob =
                    new Blob(
                        chunksRef.current,
                        {
                            type: "audio/webm"
                        }
                    );

                setBlob(audioBlob);

                setAudioURL(
                    URL.createObjectURL(audioBlob)
                );

                stream
                    .getTracks()
                    .forEach(track =>
                        track.stop()
                    );

            };

            recorder.start();

            setRecording(true);

        } catch (err) {

            console.error(err);

            alert("Microphone permission denied.");

        }

    }

    function stopRecording() {

        recorderRef.current.stop();

        setRecording(false);

    }

    async function uploadVoice() {

        if (!blob) return;

        try {

            setUploading(true);

            const formData =
                new FormData();

            formData.append(
                "file",
                blob,
                "voice-message.webm"
            );

            const res =
                await messageApi.uploadAttachment(
                    formData
                );

            if (onUploaded)
                onUploaded(res);

            setAudioURL("");
            setBlob(null);

        } catch (err) {

            console.error(err);

            alert(
                err?.response?.data?.message ||
                "Voice upload failed."
            );

        } finally {

            setUploading(false);

        }

    }

    return (

        <div className="flex items-center gap-3">

            {!recording ? (

                <button
                    type="button"
                    onClick={startRecording}
                    className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center"
                >
                    <Mic size={18} />
                </button>

            ) : (

                <button
                    type="button"
                    onClick={stopRecording}
                    className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center"
                >
                    <Square size={16} />
                </button>

            )}

            {audioURL && (

                <>
                    <audio
                        controls
                        src={audioURL}
                        className="flex-1"
                    />

                    <button
                        type="button"
                        onClick={uploadVoice}
                        disabled={uploading}
                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
                    >
                        <Send size={16} />
                    </button>
                </>

            )}

        </div>

    );

}