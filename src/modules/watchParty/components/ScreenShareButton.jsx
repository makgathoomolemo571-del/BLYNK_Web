// src/modules/watchParty/components/ScreenShareButton.jsx


import {
    useState
} from "react";

import {
    MonitorUp,
    MonitorOff
} from "lucide-react";


export default function ScreenShareButton({

    onStart,

    onStop

}) {


    const [sharing,setSharing] =
        useState(false);



    const toggleShare =
    async()=>{


        try{


            if(!sharing){


                const stream =
                await navigator.mediaDevices
                .getDisplayMedia({

                    video:true,

                    audio:true

                });


                setSharing(true);


                if(onStart)
                    onStart(stream);



                stream
                .getVideoTracks()[0]
                .addEventListener(
                    "ended",
                    ()=>{

                        setSharing(false);


                        if(onStop)
                            onStop();

                    }
                );


            }
            else{


                setSharing(false);


                if(onStop)
                    onStop();


            }


        }
        catch(err){


            console.log(
                "SCREEN SHARE ERROR",
                err
            );


        }


    };




    return (

        <button

            onClick={toggleShare}

            className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-lg
            bg-blue-600
            text-white
            "

        >

            {
                sharing

                ?

                <>

                <MonitorOff size={18}/>

                Stop Share

                </>


                :

                <>

                <MonitorUp size={18}/>

                Share Screen

                </>

            }


        </button>

    );


}