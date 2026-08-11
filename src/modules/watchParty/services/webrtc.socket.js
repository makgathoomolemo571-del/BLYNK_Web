// src/modules/watchParty/services/webrtc.socket.js

import { io } from "socket.io-client";


const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL ||
    "http://localhost:3000";



let socket = null;



/*
================================
CONNECT SOCKET
================================
*/

export const connectWebRTC = () => {


    if(socket)
        return socket;



    socket = io(
        SOCKET_URL,
        {
            transports:[
                "websocket"
            ],

            withCredentials:true
        }
    );


    socket.on(
        "connect",
        ()=>{

            console.log(
                "WEBRTC SOCKET CONNECTED:",
                socket.id
            );

        }
    );



    socket.on(
        "disconnect",
        ()=>{

            console.log(
                "WEBRTC SOCKET DISCONNECTED"
            );

        }
    );



    return socket;

};





/*
================================
GET SOCKET
================================
*/

export const getSocket = () => {

    if(!socket){

        return connectWebRTC();

    }


    return socket;

};





/*
================================
JOIN WATCH PARTY ROOM
================================
*/

export const joinWatchPartyRoom = (
    watchPartyId,
    user
)=>{


    const socket =
        getSocket();



    socket.emit(
        "watchparty:join",
        {
            watchPartyId,
            user
        }
    );


};





/*
================================
LEAVE WATCH PARTY
================================
*/

export const leaveWatchPartyRoom = (
    watchPartyId
)=>{


    if(!socket)
        return;



    socket.emit(
        "watchparty:leave",
        {
            watchPartyId
        }
    );


};





/*
================================
CREATE WEBRTC TRANSPORT
================================
*/

export const createTransport = (
    watchPartyId,
    type="producer"
)=>{


    return new Promise(
        (resolve,reject)=>{


            const socket =
                getSocket();



            socket.emit(

                "watchparty:createTransport",

                {
                    watchPartyId,
                    type
                },

                (response)=>{


                    if(response.error){

                        reject(
                            response.error
                        );

                        return;

                    }


                    resolve(
                        response
                    );


                }

            );


        }

    );

};






/*
================================
CONNECT TRANSPORT
================================
*/

export const connectTransport = (
    dtlsParameters
)=>{


    return new Promise(
        (resolve,reject)=>{


            socket.emit(

                "watchparty:connectTransport",

                {
                    dtlsParameters
                },

                (response)=>{


                    if(response.error){

                        reject(
                            response.error
                        );

                        return;

                    }


                    resolve(
                        response
                    );


                }

            );


        }
    );


};






/*
================================
PRODUCE CAMERA/MIC
================================
*/

export const produceStream = (
{
    watchPartyId,
    kind,
    rtpParameters
}
)=>{


    return new Promise(
        (resolve,reject)=>{


            socket.emit(

                "watchparty:produce",

                {
                    watchPartyId,
                    kind,
                    rtpParameters
                },


                (response)=>{


                    if(response.error){

                        reject(
                            response.error
                        );

                        return;

                    }


                    resolve(
                        response
                    );


                }

            );


        }
    );


};







/*
================================
CONSUME STREAM
================================
*/

export const consumeStream = (
{
    watchPartyId,
    producerId,
    rtpCapabilities
}
)=>{


    return new Promise(
        (resolve,reject)=>{


            socket.emit(

                "watchparty:consume",

                {
                    watchPartyId,
                    producerId,
                    rtpCapabilities
                },


                (response)=>{


                    if(response.error){

                        reject(
                            response.error
                        );

                        return;

                    }


                    resolve(
                        response
                    );


                }

            );


        }
    );


};







/*
================================
LISTEN NEW PRODUCER
================================
*/

export const onNewProducer = (
callback
)=>{


    const socket =
        getSocket();



    socket.on(

        "watchparty:newProducer",

        callback

    );


};






/*
================================
CHAT
================================
*/

export const sendChat = (
watchPartyId,
message,
user
)=>{


    const socket =
        getSocket();



    socket.emit(

        "watchparty:chat",

        {
            watchPartyId,
            message,
            user
        }

    );


};






/*
================================
WATCHERS
================================
*/

export const onViewerCount = (
callback
)=>{


    const socket =
        getSocket();



    socket.on(

        "watchparty:viewers",

        callback

    );


};






/*
================================
DISCONNECT
================================
*/

export const disconnectWebRTC = ()=>{


    if(socket){

        socket.disconnect();

        socket=null;

    }


};