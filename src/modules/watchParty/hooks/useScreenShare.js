// src/modules/watchParty/hooks/useScreenShare.js

import { useRef, useState } from "react";


export default function useScreenShare(){


    const screenRef =
    useRef(null);



    const [screenStream,setScreenStream]
    =
    useState(null);



    const startScreenShare =
    async()=>{


        try{


            const stream =
            await navigator.mediaDevices.getDisplayMedia({

                video:true,

                audio:true

            });



            screenRef.current =
            stream;


            setScreenStream(
                stream
            );


            return stream;



        }catch(err){


            console.error(
                "Screen share error:",
                err
            );


            throw err;


        }


    };




    const stopScreenShare = ()=>{


        if(screenRef.current){


            screenRef.current
            .getTracks()
            .forEach(track=>{

                track.stop();

            });


        }


        screenRef.current=null;

        setScreenStream(null);


    };




    return {


        screenStream,

        startScreenShare,

        stopScreenShare


    };


}