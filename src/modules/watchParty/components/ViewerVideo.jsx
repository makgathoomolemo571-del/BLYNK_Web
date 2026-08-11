// src/modules/watchParty/components/ViewerVideo.jsx

import {
    useEffect,
    useRef
} from "react";


export default function ViewerVideo({

    stream,

    className = ""

}) {


    const videoRef =
        useRef(null);



    useEffect(()=>{


        const video =
            videoRef.current;


        if(!video)
            return;



        if(stream){

            video.srcObject =
                stream;


            video.play()
            .catch(err=>{

                console.log(
                    "VIEWER PLAY ERROR",
                    err
                );

            });

        }


    },[stream]);



    return (

        <video

            ref={videoRef}

            autoPlay

            playsInline

            className={
                `
                w-full
                h-full
                object-cover
                rounded-xl
                bg-black
                ${className}
                `
            }

        />

    );

}