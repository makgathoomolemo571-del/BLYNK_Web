import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conversationApi from "../services/conversation.api";


/*
|--------------------------------------------------------------------------
| LOAD MY CONVERSATIONS
|--------------------------------------------------------------------------
*/
export const fetchConversations = createAsyncThunk(
  "conversation/fetchAll",
  async (_, { rejectWithValue }) => {
    try {

      const data =
        await conversationApi.getMine();

      return data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data?.message ||
        "Failed loading conversations"
      );

    }
  }
);


/*
|--------------------------------------------------------------------------
| CREATE CONVERSATION
|--------------------------------------------------------------------------
*/
export const createConversation = createAsyncThunk(
  "conversation/create",
  async (payload, { rejectWithValue }) => {
    try {

      const data =
        await conversationApi.create(payload);

      return data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data?.message ||
        "Failed creating conversation"
      );

    }
  }
);


/*
|--------------------------------------------------------------------------
| GET SINGLE CONVERSATION
|--------------------------------------------------------------------------
*/
export const fetchConversation = createAsyncThunk(
  "conversation/getOne",
  async (id, { rejectWithValue }) => {
    try {

      const data =
        await conversationApi.getById(id);

      return data;

    } catch (err) {

      return rejectWithValue(
        err.response?.data?.message ||
        "Failed loading conversation"
      );

    }
  }
);


/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/
export const updateConversation = createAsyncThunk(
  "conversation/update",
  async ({id,payload}, {rejectWithValue})=>{
    try{

      const data =
        await conversationApi.update(
          id,
          payload
        );

      return data;

    }catch(err){

      return rejectWithValue(
        err.response?.data?.message
      );

    }
  }
);


/*
|--------------------------------------------------------------------------
| ARCHIVE
|--------------------------------------------------------------------------
*/
export const archiveConversation = createAsyncThunk(
  "conversation/archive",
  async(id,{rejectWithValue})=>{
    try{

      return await conversationApi.archive(id);

    }catch(err){

      return rejectWithValue(
        err.response?.data?.message
      );

    }
  }
);



/*
|--------------------------------------------------------------------------
| UNARCHIVE
|--------------------------------------------------------------------------
*/
export const unarchiveConversation = createAsyncThunk(
  "conversation/unarchive",
  async(id,{rejectWithValue})=>{
    try{

      return await conversationApi.unarchive(id);

    }catch(err){

      return rejectWithValue(
        err.response?.data?.message
      );

    }
  }
);



/*
|--------------------------------------------------------------------------
| MUTE
|--------------------------------------------------------------------------
*/
export const muteConversation = createAsyncThunk(
  "conversation/mute",
  async(id,{rejectWithValue})=>{
    try{

      return await conversationApi.mute(id);

    }catch(err){

      return rejectWithValue(
        err.response?.data?.message
      );

    }
  }
);



/*
|--------------------------------------------------------------------------
| UNMUTE
|--------------------------------------------------------------------------
*/
export const unmuteConversation = createAsyncThunk(
  "conversation/unmute",
  async(id,{rejectWithValue})=>{
    try{

      return await conversationApi.unmute(id);

    }catch(err){

      return rejectWithValue(
        err.response?.data?.message
      );

    }
  }
);



/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/
export const deleteConversation = createAsyncThunk(
  "conversation/delete",
  async(id,{rejectWithValue})=>{
    try{

      return await conversationApi.remove(id);

    }catch(err){

      return rejectWithValue(
        err.response?.data?.message
      );

    }
  }
);



/*
|--------------------------------------------------------------------------
| STATE
|--------------------------------------------------------------------------
*/

const conversationSlice = createSlice({

  name:"conversation",

  initialState:{

    conversations:[],

    current:null,

    loading:false,

    error:null

  },


  reducers:{


    clearConversationError:(state)=>{
      state.error=null;
    },


    setCurrentConversation:(state,action)=>{
      state.current=action.payload;
    },


    addConversation:(state,action)=>{

      state.conversations.unshift(
        action.payload
      );

    },


    removeConversation:(state,action)=>{

      state.conversations =
        state.conversations.filter(
          c=>c._id !== action.payload
        );

    }

  },


  extraReducers:(builder)=>{


    builder


    .addCase(
      fetchConversations.pending,
      state=>{
        state.loading=true;
      }
    )


    .addCase(
      fetchConversations.fulfilled,
      (state,action)=>{

        state.loading=false;

        state.conversations =
          action.payload;

      }
    )


    .addCase(
      fetchConversations.rejected,
      (state,action)=>{

        state.loading=false;

        state.error =
          action.payload;

      }
    )


    .addCase(
      createConversation.fulfilled,
      (state,action)=>{

        state.conversations.unshift(
          action.payload
        );

      }
    )


    .addCase(
      fetchConversation.fulfilled,
      (state,action)=>{

        state.current =
          action.payload;

      }
    );


  }


});


export const {
  clearConversationError,
  setCurrentConversation,
  addConversation,
  removeConversation

}=conversationSlice.actions;



export default conversationSlice.reducer;