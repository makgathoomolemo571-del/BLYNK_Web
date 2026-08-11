import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import AdvertisementAPI
from "../services/advertisements.api";

/*
|--------------------------------------------------------------------------
| LOAD ADS
|--------------------------------------------------------------------------
*/

export const loadAdvertisements =
createAsyncThunk(

"advertisements/load",

async () => {

  return await AdvertisementAPI.getAdvertisements();

}

);

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

export const createAdvertisement =
createAsyncThunk(

"advertisements/create",

async (payload) => {

  return await AdvertisementAPI.createAdvertisement(
    payload
  );

}

);

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateAdvertisement =
createAsyncThunk(

"advertisements/update",

async ({ id, payload }) => {

  return await AdvertisementAPI.updateAdvertisement(
    id,
    payload
  );

}

);

/*
|--------------------------------------------------------------------------
| PAUSE
|--------------------------------------------------------------------------
*/

export const pauseAdvertisement =
createAsyncThunk(

"advertisements/pause",

async (id) => {

  return await AdvertisementAPI.pauseAdvertisement(
    id
  );

}

);

/*
|--------------------------------------------------------------------------
| RESUME
|--------------------------------------------------------------------------
*/

export const resumeAdvertisement =
createAsyncThunk(

"advertisements/resume",

async (id) => {

  return await AdvertisementAPI.resumeAdvertisement(
    id
  );

}

);

/*
|--------------------------------------------------------------------------
| CLICK
|--------------------------------------------------------------------------
*/

export const clickAdvertisement =
createAsyncThunk(

"advertisements/click",

async (id) => {

  return await AdvertisementAPI.clickAdvertisement(
    id
  );

}

);

/*
|--------------------------------------------------------------------------
| IMPRESSION
|--------------------------------------------------------------------------
*/

export const impressionAdvertisement =
createAsyncThunk(

"advertisements/impression",

async (id) => {

  return await AdvertisementAPI.impressionAdvertisement(
    id
  );

}

);

const slice = createSlice({

name: "advertisements",

initialState: {

loading: false,

ads: [],

error: null

},

reducers: {

clearAdvertisementState(state) {

state.error = null;

}

},

extraReducers: (builder) => {

builder

/*
|--------------------------------------------------------------------------
| LOAD
|--------------------------------------------------------------------------
*/

.addCase(
loadAdvertisements.pending,

(state) => {

state.loading = true;

}

)

.addCase(
loadAdvertisements.fulfilled,

(state, action) => {

state.loading = false;

state.ads = action.payload;

}

)

.addCase(
loadAdvertisements.rejected,

(state, action) => {

state.loading = false;

state.error = action.error.message;

}

)

/*
|--------------------------------------------------------------------------
| CREATE
|--------------------------------------------------------------------------
*/

.addCase(
createAdvertisement.fulfilled,

(state, action) => {

state.ads.unshift(action.payload);

}

)

/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

.addCase(
updateAdvertisement.fulfilled,

(state, action) => {

const index =
state.ads.findIndex(

a => a.id === action.payload.id

);

if (index !== -1)

state.ads[index] =
action.payload;

}

)

/*
|--------------------------------------------------------------------------
| PAUSE
|--------------------------------------------------------------------------
*/

.addCase(
pauseAdvertisement.fulfilled,

(state, action) => {

const index =
state.ads.findIndex(

a => a.id === action.payload.id

);

if (index !== -1)

state.ads[index] =
action.payload;

}

)

/*
|--------------------------------------------------------------------------
| RESUME
|--------------------------------------------------------------------------
*/

.addCase(
resumeAdvertisement.fulfilled,

(state, action) => {

const index =
state.ads.findIndex(

a => a.id === action.payload.id

);

if (index !== -1)

state.ads[index] =
action.payload;

}

)

/*
|--------------------------------------------------------------------------
| CLICK
|--------------------------------------------------------------------------
*/

.addCase(
clickAdvertisement.fulfilled,

(state, action) => {

const index =
state.ads.findIndex(

a => a.id === action.payload.id

);

if (index !== -1)

state.ads[index] =
action.payload;

}

)

/*
|--------------------------------------------------------------------------
| IMPRESSION
|--------------------------------------------------------------------------
*/

.addCase(
impressionAdvertisement.fulfilled,

(state, action) => {

const index =
state.ads.findIndex(

a => a.id === action.payload.id

);

if (index !== -1)

state.ads[index] =
action.payload;

}

);

}

});

export const {

clearAdvertisementState

} = slice.actions;

export default slice.reducer;