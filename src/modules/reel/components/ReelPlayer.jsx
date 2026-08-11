import React,{
    useRef,
    useEffect
} from "react";

export default function ReelPlayer({
    reel,
    autoPlay
}){

    const videoRef = useRef(null);

    useEffect(()=>{

        const video = videoRef.current;

        if(!video) return;

        if(autoPlay){

            video.play().catch(()=>{});

        }else{

            video.pause();

        }

    },[autoPlay]);

    return(

<video
ref={videoRef}
src={reel.video?.url}
poster={reel.video?.thumbnail}
className="w-full h-full object-cover"
playsInline
muted
loop
onClick={() => {
    if (videoRef.current.paused) {
        videoRef.current.play();
    } else {
        videoRef.current.pause();
    }
}}
/>



    );

};

