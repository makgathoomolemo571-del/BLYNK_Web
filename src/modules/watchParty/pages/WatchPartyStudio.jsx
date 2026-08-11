import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getWatchParty } from "../services/watchParty.api";

export default function WatchPartyStudio() {
    const { id } = useParams();

    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const [party, setParty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [starting, setStarting] = useState(false);

    useEffect(() => {
        loadStudio();

        return () => {
            stopCamera();
        };
    }, []);

    async function loadStudio() {
        try {
            const data = await getWatchParty(id);

            console.log("STUDIO PARTY", data);

            setParty(data);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Cannot load studio"
            );
        } finally {
            setLoading(false);
        }
    }

  async function startCamera() {

    console.log("1. startCamera");

    try {

        console.log("2. Before getUserMedia");

        const promise = navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });

        console.log("3. Promise created");

        const stream = await Promise.race([
            promise,
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timed out")), 10000)
            )
        ]);

        console.log("4. Stream received", stream);

        streamRef.current = stream;

        videoRef.current.srcObject = stream;

        await videoRef.current.play();

        console.log("5. Video playing");

    } catch (err) {

        console.error("FAILED", err);

    }
}

    function stopCamera() {

        if (!streamRef.current) return;

        streamRef.current.getTracks().forEach(track => track.stop());

        streamRef.current = null;

    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Loading Studio...
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6">

            <h1 className="text-3xl font-bold mb-6">
                🎥 Live Studio
            </h1>

            <div className="grid grid-cols-3 gap-6">

                <div className="col-span-2">

                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full rounded-xl bg-black aspect-video"
                    />

                </div>

                <div className="bg-zinc-900 rounded-xl p-5">

                    <h2 className="text-xl font-bold">
                        {party?.title}
                    </h2>

                    <p className="text-gray-400 mt-2">
                        Ready to go live
                    </p>

                    <button
                        onClick={startCamera}
                        disabled={starting}
                        className="mt-5 bg-red-600 px-6 py-3 rounded-xl w-full"
                    >
                        {starting ? "Starting..." : "🎥 Start Camera"}
                    </button>

                    <button
                        onClick={stopCamera}
                        className="mt-3 bg-gray-700 px-6 py-3 rounded-xl w-full"
                    >
                        Stop Camera
                    </button>

                </div>

            </div>

        </div>
    );
}