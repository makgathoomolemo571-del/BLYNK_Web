import api from "../../../config/api";

const BASE_URL = "/monetization";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

const getDashboard = () =>
    api.get(`${BASE_URL}/dashboard`);

const getWallet = () =>
    api.get(`${BASE_URL}/wallet`);

const getRevenue = () =>
    api.get(`${BASE_URL}/revenue`);

const getAnalytics = () =>
    api.get(`${BASE_URL}/analytics`);

const getEligibility = () =>
    api.get(`${BASE_URL}/eligibility`);

const updateSettings = (payload) =>
    api.patch(`${BASE_URL}/settings`, payload);

export default {

    getDashboard,

    getWallet,

    getRevenue,

    getAnalytics,

    getEligibility,

    updateSettings

};