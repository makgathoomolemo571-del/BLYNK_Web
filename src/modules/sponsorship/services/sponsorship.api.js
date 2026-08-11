import api from "../../../config/api";


const BASE_URL = "/sponsorships";


/*
====================================
CREATE SPONSORSHIP
====================================
*/
export const createSponsorship = async (payload)=>{
    const {data}=await api.post(
        BASE_URL,
        payload
    );

    return data;
};


/*
====================================
GET ALL CAMPAIGNS
====================================
*/
export const getSponsorships = async(params={})=>{

    const {data}=await api.get(
        BASE_URL,
        {
            params
        }
    );

    return data;
};


/*
====================================
GET MY CREATED CAMPAIGNS
====================================
*/
export const getMySponsorships = async()=>{

    const {data}=await api.get(
        `${BASE_URL}/my`
    );

    return data;
};


/*
====================================
GET RECEIVED
====================================
*/
export const getReceivedSponsorships = async()=>{

    const {data}=await api.get(
        `${BASE_URL}/received`
    );

    return data;
};


/*
====================================
GET SINGLE
====================================
*/
export const getSponsorship = async(id)=>{

    const {data}=await api.get(
        `${BASE_URL}/${id}`
    );

    return data;
};


/*
====================================
UPDATE
====================================
*/
export const updateSponsorship = async(
    id,
    payload
)=>{

    const {data}=await api.patch(
        `${BASE_URL}/${id}`,
        payload
    );

    return data;
};


/*
====================================
DELETE
====================================
*/
export const deleteSponsorship = async(id)=>{

    const {data}=await api.delete(
        `${BASE_URL}/${id}`
    );

    return data;
};


/*
====================================
APPLY CREATOR
====================================
*/
export const applySponsorship = async(
    id,
    payload
)=>{

    const {data}=await api.post(
        `${BASE_URL}/${id}/apply`,
        payload
    );

    return data;
};


/*
====================================
GET APPLICATIONS
====================================
*/

export const getSponsorshipApplications = async (id) => {
  const { data } = await api.get(
    `${BASE_URL}/${id}/applications`
  );

  return data;
};


/*
====================================
APPROVE APPLICATION
====================================
*/

export const acceptSponsorshipApplication = async (
  sponsorshipId,
  applicationId
) => {

     console.log("Accept Application", {
    sponsorshipId,
    applicationId
  });
  
  const { data } = await api.patch(
    `${BASE_URL}/${sponsorshipId}/applications/${applicationId}/accept`
  );

  return data;
};


/*
====================================
REJECT APPLICATION
====================================
*/

export const rejectSponsorshipApplication = async (
  sponsorshipId,
  applicationId
) => {
  const { data } = await api.patch(
    `${BASE_URL}/${sponsorshipId}/applications/${applicationId}/reject`
  );

  return data;
};

/*
====================================
ACCEPT CREATOR
====================================
*/
export const acceptCreator = async(
    id,
    applicationId
)=>{

    const {data}=await api.patch(
        `${BASE_URL}/${id}/applications/${applicationId}/accept`
    );

    return data;
};


/*
====================================
REJECT CREATOR
====================================
*/
export const rejectCreator = async(
    id,
    applicationId
)=>{

    const {data}=await api.patch(
        `${BASE_URL}/${id}/applications/${applicationId}/reject`
    );

    return data;
};


/*
====================================
START
====================================
*/
export const startSponsorship = async(id)=>{

    const {data}=await api.patch(
        `${BASE_URL}/${id}/start`
    );

    return data;
};


/*
====================================
COMPLETE
====================================
*/
export const completeSponsorship = async(id)=>{

    const {data}=await api.patch(
        `${BASE_URL}/${id}/complete`
    );

    return data;
};


/*
====================================
PAY CREATOR
====================================
*/
export const releasePayment = async(id)=>{

    const {data}=await api.post(
        `${BASE_URL}/${id}/pay`
    );

    return data;
};


const sponsorshipApi = {

  create: createSponsorship,
  createSponsorship,

  get: getSponsorship,
  getSponsorship,

  getAll: getSponsorships,
  getSponsorships,

  getMine: getMySponsorships,
  getMySponsorships,

  update: updateSponsorship,
  updateSponsorship,

  delete: deleteSponsorship,
  deleteSponsorship,

  apply: applySponsorship,
  applySponsorship,

  accept: acceptCreator,
  reject: rejectCreator,

  start: startSponsorship,
  complete: completeSponsorship,

  pay: releasePayment,
  releasePayment

};

export default sponsorshipApi;


