import {useEffect,useState} from "react";

import sponsorshipApi 
from "../services/sponsorship.api";


export default function useSponsorships(){

const [items,setItems]=useState([]);

const [loading,setLoading]=useState(false);

const [error,setError]=useState(null);



const load=async()=>{

try{

setLoading(true);

const res=
await sponsorshipApi.getSponsorships();


setItems(
res.data || res
);


}catch(err){

setError(err);

}
finally{

setLoading(false);

}

};



useEffect(()=>{

load();

},[]);



return{

items,
loading,
error,
reload:load

};

}