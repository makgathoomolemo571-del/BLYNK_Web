import {createSlice} from "@reduxjs/toolkit";


const initialState={

    sponsorships:[],

    current:null,

    received:[],

    loading:false,

    error:null

};



const sponsorshipSlice=createSlice({

    name:"sponsorship",

    initialState,


    reducers:{


        setSponsorships:(state,action)=>{

            state.sponsorships =
            action.payload;

        },


        addSponsorship:(state,action)=>{

            state.sponsorships.unshift(
                action.payload
            );

        },


        setCurrentSponsorship:(state,action)=>{

            state.current =
            action.payload;

        },


        setReceivedSponsorships:(state,action)=>{

            state.received =
            action.payload;

        },


        updateSponsorshipState:(state,action)=>{

            const updated =
            action.payload;


            const index =
            state.sponsorships.findIndex(
                item=>item.id===updated.id
            );


            if(index!==-1){

                state.sponsorships[index]=
                updated;

            }


            if(
                state.current?.id===
                updated.id
            ){

                state.current =
                updated;

            }

        },


        removeSponsorship:(state,action)=>{

            state.sponsorships =
            state.sponsorships.filter(
                item=>
                item.id!==action.payload
            );

        },


        setLoading:(state,action)=>{

            state.loading =
            action.payload;

        },


        setError:(state,action)=>{

            state.error =
            action.payload;

        },


        clearSponsorship:(state)=>{

            state.current=null;

        }

    }

});


export const {

    setSponsorships,

    addSponsorship,

    setCurrentSponsorship,

    setReceivedSponsorships,

    updateSponsorshipState,

    removeSponsorship,

    setLoading,

    setError,

    clearSponsorship


}=sponsorshipSlice.actions;



export default sponsorshipSlice.reducer;