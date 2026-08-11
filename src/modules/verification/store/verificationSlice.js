// modules/verification/store/verificationSlice.js

import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../services/verification.api";

/*
|--------------------------------------------------------------------------
| THUNKS
|--------------------------------------------------------------------------
*/

export const fetchMyVerifications =
createAsyncThunk(

"verification/fetchMine",

async (_, thunkAPI) => {

try{

const { data } =
await api.getMine();

return data;

}catch(error){

return thunkAPI.rejectWithValue(

error.response?.data?.message ||

error.message

);

}

}

);

export const submitVerification =
createAsyncThunk(

"verification/submit",

async(payload, thunkAPI)=>{

try{

const { data } =
await api.create(payload);

return data;

}catch(error){

return thunkAPI.rejectWithValue(

error.response?.data?.message ||

error.message

);

}

}

);

/*
|--------------------------------------------------------------------------
| INITIAL STATE
|--------------------------------------------------------------------------
*/

const initialState = {

records: [],

loading: false,

submitting: false,

error: null

};

/*
|--------------------------------------------------------------------------
| SLICE
|--------------------------------------------------------------------------
*/

const verificationSlice =
createSlice({

name:"verification",

initialState,

reducers:{

clearVerificationError(state){

state.error = null;

},

resetVerificationState(){

return initialState;

}

},

extraReducers:(builder)=>{

builder

/*
|--------------------------------------------------------------------------
| GET MINE
|--------------------------------------------------------------------------
*/

.addCase(

fetchMyVerifications.pending,

(state)=>{

state.loading = true;

state.error = null;

}

)

.addCase(

fetchMyVerifications.fulfilled,

(state,action)=>{

state.loading = false;

state.records = action.payload;

}

)

.addCase(

fetchMyVerifications.rejected,

(state,action)=>{

state.loading = false;

state.error = action.payload;

}

)

/*
|--------------------------------------------------------------------------
| SUBMIT
|--------------------------------------------------------------------------
*/

.addCase(

submitVerification.pending,

(state)=>{

state.submitting = true;

state.error = null;

}

)

.addCase(

submitVerification.fulfilled,

(state,action)=>{

state.submitting = false;

state.records.unshift(

action.payload

);

}

)

.addCase(

submitVerification.rejected,

(state,action)=>{

state.submitting = false;

state.error = action.payload;

}

);

}

});

export const {

clearVerificationError,

resetVerificationState

} = verificationSlice.actions;

export default verificationSlice.reducer;