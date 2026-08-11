import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Mic, MicOff } from "lucide-react";

export default function CameraPreview({
    onStreamReady
}) {

    const videoRef = useRef(null);

    const [stream,setStream] = useState(null);

    const [cameraOn,setCameraOn] =
        useState(true);

    const [micOn,setMicOn] =
        useState(true);



    useEffect(()=>{


        startCamera();


        return ()=>{

            stopCamera();

        };


    },[]);



    async function startCamera(){

        try{


            const mediaStream =
                await navigator.mediaDevices.getUserMedia({

                    video:true,

                    audio:true

                });



            setStream(
                mediaStream
            );


            if(videoRef.current){

                videoRef.current.srcObject =
                    mediaStream;

            }


            if(onStreamReady){

                onStreamReady(
                    mediaStream
                );

            }


        }
        catch(err){

            console.error(
                "Camera error:",
                err
            );

        }


    }




    function stopCamera(){

        if(!stream) return;


        stream
        .getTracks()
        .forEach(
            track=>track.stop()
        );


    }




    function toggleCamera(){


        if(!stream) return;


        const videoTrack =
            stream
            .getVideoTracks()[0];


        if(videoTrack){

            videoTrack.enabled =
            !videoTrack.enabled;


            setCameraOn(
                videoTrack.enabled
            );

        }


    }




    function toggleMic(){


        if(!stream) return;


        const audioTrack =
        stream
        .getAudioTracks()[0];


        if(audioTrack){

            audioTrack.enabled =
            !audioTrack.enabled;


            setMicOn(
                audioTrack.enabled
            );

        }


    }




    return (

        <div className="
            relative
            bg-black
            rounded-xl
            overflow-hidden
            w-full
        ">


            <video

                ref={videoRef}

                autoPlay

                muted

                playsInline

                className="
                    w-full
                    aspect-video
                    object-cover
                "

            />



            <div className="
                absolute
                bottom-4
                left-4
                flex
                gap-3
            ">


                <button

                    onClick={toggleCamera}

                    className="
                        bg-black/70
                        text-white
                        p-3
                        rounded-full
                    "

                >

                    {
                        cameraOn

                        ?

                        <Camera size={22}/>

                        :

                        <CameraOff size={22}/>

                    }


                </button>



                <button

                    onClick={toggleMic}

                    className="
                        bg-black/70
                        text-white
                        p-3
                        rounded-full
                    "

                >

                    {
                        micOn

                        ?

                        <Mic size={22}/>

                        :

                        <MicOff size={22}/>

                    }


                </button>



            </div>



        </div>

    );


}