import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    fetchAdvertisements
} from "../store/advertisementSlice";

import AdvertisementCard
from "../components/AdvertisementCard";

export default function MyAdvertisements(){

    const dispatch = useDispatch();

    const {
        advertisements,
        loading
    } = useSelector(
        state=>state.advertisements
    );

    useEffect(()=>{

        dispatch(fetchAdvertisements());

    },[dispatch]);

    return(

        <div className="page-container">

            <div className="page-header">

                <h1>
                    My Advertisements
                </h1>

                <Link
                    to="/advertisements/create"
                    className="btn btn-primary"
                >
                    Create Advertisement
                </Link>

            </div>

            {loading &&

                <p>Loading...</p>

            }

            <div className="grid">

                {advertisements.map(ad=>(

                    <AdvertisementCard
                        key={ad.id}
                        advertisement={ad}
                    />

                ))}

            </div>

        </div>

    );

}