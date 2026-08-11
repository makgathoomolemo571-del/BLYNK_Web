export const sponsorshipStatus = {

draft:{
    label:"Draft",
    color:"gray"
},

requested:{
    label:"Requested",
    color:"yellow"
},

negotiating:{
    label:"Negotiating",
    color:"blue"
},

accepted:{
    label:"Accepted",
    color:"green"
},

active:{
    label:"Active",
    color:"purple"
},

submitted:{
    label:"Submitted",
    color:"orange"
},

approved:{
    label:"Approved",
    color:"green"
},

completed:{
    label:"Completed",
    color:"emerald"
},

cancelled:{
    label:"Cancelled",
    color:"red"
},

disputed:{
    label:"Disputed",
    color:"red"
}

};


export function getSponsorshipStatus(status){

return sponsorshipStatus[status] ||
{
 label:status,
 color:"gray"
};

}