import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchMyApplications
} from "../store/applicationSlice";

import ApplicationList
from "../components/ApplicationList";

import EmptyApplications
from "../components/EmptyApplications";

export default function ApplicationsPage(){

    const dispatch = useDispatch();

    const {
        applications,
        loading
    } = useSelector(
        state=>state.application
    );

    useEffect(()=>{

        dispatch(
            fetchMyApplications()
        );

    },[dispatch]);

    return(

        <div className="page-container">

            <div className="page-header">

                <h1>
                    My Applications
                </h1>

                <p>
                    View every application you've submitted.
                </p>

            </div>

            {

            loading ?

            <div className="loading">
                Loading...
            </div>

            :

            applications.length===0 ?

            <EmptyApplications/>

            :

            <ApplicationList
                items={applications}
            />

            }

        </div>

    );

}