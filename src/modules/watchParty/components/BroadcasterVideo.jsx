// src/modules/watchParty/components/BroadcasterVideo.jsx

import { useEffect, useRef, useState } from "react";

export default function BroadcasterVideo({
    stream,
    muted = true,
    className = ""
}) {

    const videoRef = useRef(null);

    const [active,setActive] =
        useState(false);


    useEffect(()=>{

        const video =
            videoRef.current;


        if(!video) return;


        if(stream){

            video.srcObject = stream;

            video.play()
            .then(()=>{

                setActive(true);

            })
            .catch(err=>{

                console.log(
                    "VIDEO PLAY ERROR",
                    err
                );

            });

        }


    },[stream]);



    return (

        <div
            className={
                `relative bg-black rounded-xl overflow-hidden ${className}`
            }
        >


            <video

                ref={videoRef}

                autoPlay

                playsInline

                muted={muted}

                className="
                    w-full
                    h-full
                    object-cover
                "

            />


            {!active && (

                <div
                    className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-white
                    bg-black/60
                    "
                >

                    Waiting for camera...

                </div>

            )}


        </div>

    );

}