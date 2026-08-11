// src/modules/watchParty/hooks/useMicrophone.js

import { useRef, useState } from "react";


export default function useMicrophone(){


    const audioRef = useRef(null);


    const [microphoneStream,setMicrophoneStream]
    =
    useState(null);



    const startMicrophone = async()=>{


        try{


            const stream =
            await navigator.mediaDevices.getUserMedia({

                audio:true,

                video:false

            });



            audioRef.current =
            stream;


            setMicrophoneStream(
                stream
            );


            return stream;



        }catch(err){


            console.error(
                "Microphone error:",
                err
            );


            throw err;


        }


    };





    const stopMicrophone = ()=>{


        if(audioRef.current){


            audioRef.current
            .getTracks()
            .forEach(track=>{

                track.stop();

            });


        }


        audioRef.current=null;

        setMicrophoneStream(null);


    };




    return {


        microphoneStream,

        startMicrophone,

        stopMicrophone


    };


}