// src/modules/watchParty/hooks/useWebRTC.js

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


export default function useWebRTC(
    watchPartyId,
    user
){


    const socketRef =
    useRef(null);


    const peerRef =
    useRef(null);



    const [connected,setConnected]
    =
    useState(false);



    const [remoteStream,setRemoteStream]
    =
    useState(null);




    useEffect(()=>{


        if(!watchPartyId)
            return;



        const socket =
        io(
            import.meta.env.VITE_SOCKET_URL,
            {

                transports:[
                    "websocket"
                ],

                withCredentials:true

            }
        );



        socketRef.current =
        socket;



        socket.emit(
            "watchparty:join",
            {

                watchPartyId,

                user

            }
        );



        socket.on(
            "watchparty:newProducer",
            data=>{


                console.log(
                    "New producer:",
                    data
                );


            }
        );



        socket.on(
            "watchparty:viewers",
            count=>{


                console.log(
                    "Viewers:",
                    count
                );


            }
        );



        socket.on(
            "connect",
            ()=>{


                setConnected(true);


            }
        );




        return ()=>{


            socket.emit(
                "watchparty:leave",
                {
                    watchPartyId
                }
            );


            socket.disconnect();


        };


    },[
        watchPartyId
    ]);





    const sendTransport =
    (stream)=>{


        if(!socketRef.current)
            return;


        stream
        .getTracks()
        .forEach(track=>{


            socketRef.current.emit(

                "watchparty:produce",

                {

                    watchPartyId,

                    kind:
                    track.kind

                }

            );


        });



    };





    return {


        socket:
        socketRef.current,


        connected,


        remoteStream,


        sendTransport


    };


}