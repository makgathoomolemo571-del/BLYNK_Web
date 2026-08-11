import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";


const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL;


export default function useChatSocket({
  conversationId,
  userId
}) {

  const socketRef = useRef(null);


  const [messages, setMessages] =
    useState([]);

  const [typingUsers, setTypingUsers] =
    useState([]);

  const [onlineUsers, setOnlineUsers] =
    useState([]);


  useEffect(() => {

    if (!conversationId)
      return;


    const socket = io(
      SOCKET_URL,
      {
        withCredentials:true,
        transports:[
          "websocket"
        ]
      }
    );


    socketRef.current = socket;



    /*
    ============================
    JOIN CONVERSATION
    ============================
    */

    socket.emit(
      "conversation_join",
      {
        conversationId,
        userId
      }
    );



    /*
    ============================
    NEW MESSAGE
    ============================
    */

    socket.on(
      "message_new",
      (message)=>{

        setMessages(prev=>[
          ...prev,
          message
        ]);

      }
    );



    /*
    ============================
    MESSAGE UPDATED
    ============================
    */

    socket.on(
      "message_updated",
      (message)=>{

        setMessages(prev =>
          prev.map(item =>
            item._id === message._id
              ? message
              : item
          )
        );

      }
    );



    /*
    ============================
    MESSAGE DELETED
    ============================
    */

    socket.on(
      "message_deleted",
      ({
        messageId
      })=>{

        setMessages(prev =>
          prev.filter(
            item =>
            item._id !== messageId
          )
        );

      }
    );



    /*
    ============================
    TYPING
    ============================
    */

    socket.on(
      "typing_start",
      (user)=>{

        setTypingUsers(prev=>{

          if(
            prev.includes(user._id)
          )
            return prev;


          return [
            ...prev,
            user._id
          ];

        });

      }
    );


    socket.on(
      "typing_stop",
      (user)=>{

        setTypingUsers(prev =>
          prev.filter(
            id =>
            id !== user._id
          )
        );

      }
    );



    /*
    ============================
    READ RECEIPTS
    ============================
    */

    socket.on(
      "message_read",
      ({
        messageId,
        userId
      })=>{


        setMessages(prev =>
          prev.map(msg=>{

            if(
              msg._id === messageId
            ){

              return {
                ...msg,
                readBy:[
                  ...(msg.readBy || []),
                  userId
                ]
              };

            }


            return msg;

          })
        );


      }
    );



    /*
    ============================
    PRESENCE
    ============================
    */

    socket.on(
      "presence_update",
      users=>{

        setOnlineUsers(users);

      }
    );



    return ()=>{

      socket.emit(
        "conversation_leave",
        {
          conversationId,
          userId
        }
      );


      socket.disconnect();

    };


  },[
    conversationId,
    userId
  ]);




  /*
  ============================
  SEND MESSAGE
  ============================
  */

  const sendMessage = (
    payload
  )=>{

    socketRef.current.emit(
      "message_send",
      {
        conversationId,
        ...payload
      }
    );

  };



  /*
  ============================
  TYPING START
  ============================
  */

  const startTyping = ()=>{

    socketRef.current.emit(
      "typing_start",
      {
        conversationId
      }
    );

  };



  /*
  ============================
  TYPING STOP
  ============================
  */

  const stopTyping = ()=>{

    socketRef.current.emit(
      "typing_stop",
      {
        conversationId
      }
    );

  };



  /*
  ============================
  READ MESSAGE
  ============================
  */

  const markRead = (
    messageId
  )=>{

    socketRef.current.emit(
      "message_read",
      {
        conversationId,
        messageId
      }
    );

  };



  return {

    socket:
      socketRef.current,

    messages,

    setMessages,

    typingUsers,

    onlineUsers,

    sendMessage,

    startTyping,

    stopTyping,

    markRead

  };

}