// src/modules/episode/components/EpisodeUploader.jsx

import { useRef } from "react";

import {
    Upload,
    X,
    Music,
    Video,
    Image
} from "lucide-react";

export default function EpisodeUploader({

    label,

    accept,

    type,

    file,

    onChange

}) {

    const inputRef = useRef(null);

    const openPicker = () => {

        inputRef.current?.click();

    };

    const handleFile = (e) => {

        const selected =
            e.target.files[0];

        if (!selected) return;

        onChange(selected);

    };

    const remove = () => {

        onChange(null);

        if (inputRef.current)
            inputRef.current.value = "";

    };

    const renderPreview = () => {

        if (!file) return null;

        const url =
            URL.createObjectURL(file);

        switch (type) {

            case "image":

                return (

                    <img

                        src={url}

                        alt="preview"

                        className="w-full rounded-xl max-h-60 object-cover"

                    />

                );

            case "video":

                return (

                    <video

                        controls

                        className="w-full rounded-xl"

                    >

                        <source src={url} />

                    </video>

                );

            case "audio":

                return (

                    <audio

                        controls

                        className="w-full"

                    >

                        <source src={url} />

                    </audio>

                );

            default:

                return null;

        }

    };

    const renderIcon = () => {

        switch (type) {

            case "audio":

                return <Music size={42} />;

            case "video":

                return <Video size={42} />;

            default:

                return <Image size={42} />;

        }

    };

    return (

        <div className="space-y-3">

            <label className="font-semibold">

                {label}

            </label>

            {

                file ? (

                    <div className="rounded-xl border p-4 space-y-4">

                        {renderPreview()}

                        <div className="flex justify-between items-center">

                            <div>

                                <div className="font-medium">

                                    {file.name}

                                </div>

                                <div className="text-sm text-gray-500">

                                    {(file.size / 1024 / 1024).toFixed(2)} MB

                                </div>

                            </div>

                            <button

                                type="button"

                                onClick={remove}

                                className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700"

                            >

                                <X size={18} />

                            </button>

                        </div>

                    </div>

                ) : (

                    <button

                        type="button"

                        onClick={openPicker}

                        className="w-full border-2 border-dashed rounded-xl p-10 hover:border-blue-500 hover:bg-blue-50 transition"

                    >

                        <div className="flex flex-col items-center gap-4">

                            {renderIcon()}

                            <Upload size={28} />

                            <div className="font-semibold">

                                Upload {label}

                            </div>

                            <div className="text-sm text-gray-500">

                                Click to browse

                            </div>

                        </div>

                    </button>

                )

            }

            <input

                ref={inputRef}

                type="file"

                accept={accept}

                onChange={handleFile}

                hidden

            />

        </div>

    );

}