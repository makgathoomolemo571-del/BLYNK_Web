import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  currentMessage: null,

  loading: false,
  sending: false,

  error: null,

  pagination: {
    page: 1,
    limit: 30,
    total: 0,
    hasMore: false
  },

  typingUsers: [],

  onlineUsers: [],

  unreadCount: 0
};


const messageSlice = createSlice({

  name: "messages",

  initialState,

  reducers: {

    /**
     * ==========================
     * LOAD MESSAGES
     * ==========================
     */

    fetchMessagesStart(state) {
      state.loading = true;
      state.error = null;
    },


    fetchMessagesSuccess(state, action) {

      state.loading = false;

      state.messages =
        action.payload.messages || [];

      state.pagination =
        action.payload.pagination ||
        state.pagination;

    },


    fetchMessagesFailure(state, action) {

      state.loading = false;

      state.error =
        action.payload;

    },


    /**
     * ==========================
     * CREATE MESSAGE
     * ==========================
     */

    sendMessageStart(state) {

      state.sending = true;

    },


    sendMessageSuccess(state, action) {

      state.sending = false;

      state.messages.push(
        action.payload
      );

    },


    sendMessageFailure(state, action) {

      state.sending = false;

      state.error =
        action.payload;

    },


    /**
     * ==========================
     * RECEIVE SOCKET MESSAGE
     * ==========================
     */

    receiveMessage(state, action) {

      state.messages.push(
        action.payload
      );

    },


    /**
     * ==========================
     * UPDATE MESSAGE
     * PATCH /messages/:id
     * ==========================
     */

    updateMessage(state, action) {

      const index =
        state.messages.findIndex(
          m =>
          m._id === action.payload._id
        );


      if(index !== -1){

        state.messages[index] =
          action.payload;

      }

    },


    /**
     * ==========================
     * DELETE MESSAGE
     * ==========================
     */

    deleteMessage(state, action){

      state.messages =
        state.messages.filter(
          m =>
          m._id !== action.payload
        );

    },


    /**
     * ==========================
     * DELETE FOR EVERYONE
     * ==========================
     */

    deleteMessageForEveryone(
      state,
      action
    ){

      const msg =
        state.messages.find(
          m =>
          m._id === action.payload
        );


      if(msg){

        msg.deletedForEveryone =
          true;

        msg.content =
          "Message deleted";

      }

    },


    /**
     * ==========================
     * REACTIONS
     * ==========================
     */

    reactToMessage(
      state,
      action
    ){

      const msg =
        state.messages.find(
          m =>
          m._id === action.payload.messageId
        );


      if(msg){

        msg.reactions =
          action.payload.reactions;

      }

    },


    /**
     * ==========================
     * READ RECEIPTS
     * ==========================
     */

    markMessageRead(
      state,
      action
    ){

      const msg =
        state.messages.find(
          m =>
          m._id === action.payload.messageId
        );


      if(msg){

        msg.readBy =
          action.payload.readBy;

      }

    },


    /**
     * ==========================
     * REPLY
     * ==========================
     */

    addReply(
      state,
      action
    ){

      state.messages.push(
        action.payload
      );

    },


    /**
     * ==========================
     * ATTACHMENTS
     * ==========================
     */

    addAttachment(
      state,
      action
    ){

      const msg =
        state.messages.find(
          m =>
          m._id === action.payload.messageId
        );


      if(msg){

        msg.attachments =
          [
            ...(msg.attachments || []),
            action.payload.attachment
          ];

      }

    },


    /**
     * ==========================
     * TYPING SOCKET
     * ==========================
     */

    setTypingUsers(
      state,
      action
    ){

      state.typingUsers =
        action.payload;

    },


    /**
     * ==========================
     * PRESENCE SOCKET
     * ==========================
     */

    setOnlineUsers(
      state,
      action
    ){

      state.onlineUsers =
        action.payload;

    },


    /**
     * ==========================
     * UNREAD
     * ==========================
     */

    setUnreadCount(
      state,
      action
    ){

      state.unreadCount =
        action.payload;

    },


    clearMessages(state){

      state.messages = [];

      state.currentMessage = null;

    },


    clearMessageError(state){

      state.error = null;

    }

  }

});


export const {

  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure,

  sendMessageStart,
  sendMessageSuccess,
  sendMessageFailure,

  receiveMessage,

  updateMessage,
  deleteMessage,
  deleteMessageForEveryone,

  reactToMessage,

  markMessageRead,

  addReply,

  addAttachment,

  setTypingUsers,
  setOnlineUsers,

  setUnreadCount,

  clearMessages,
  clearMessageError

} = messageSlice.actions;


export default messageSlice.reducer;