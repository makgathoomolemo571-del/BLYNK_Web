// src/modules/watchParty/hooks/useCamera.js

import { useRef, useState } from "react";


export default function useCamera(){

    const streamRef = useRef(null);

    const [cameraStream,setCameraStream] =
        useState(null);


    const startCamera = async()=>{

        try{

            const stream =
                await navigator.mediaDevices.getUserMedia({

                    video:{
                        width:1280,
                        height:720
                    },

                    audio:false

                });


            streamRef.current = stream;

            setCameraStream(stream);


            return stream;


        }catch(err){

            console.error(
                "Camera error:",
                err
            );

            throw err;

        }

    };



    const stopCamera = ()=>{


        if(streamRef.current){

            streamRef.current
            .getTracks()
            .forEach(track=>{

                track.stop();

            });


        }


        streamRef.current = null;

        setCameraStream(null);


    };



    return {

        cameraStream,

        startCamera,

        stopCamera

    };


}