// src/modules/episode/services/episode.api.js

import api from "../../../config/api";

const BASE = "/episodes";

const episodeApi = {

    create(data) {
        return api
            .post(BASE, data)
            .then(res => res.data);
    },

    // Get all episodes for one podcast
getByPodcast(podcastId) {
    return api
        .get(`${BASE}/podcast/${podcastId}`)
        .then(res => res.data);
},
    

    getById(id) {
        return api
            .get(`${BASE}/${id}`)
            .then(res => res.data);
    },

    update(id, data) {
        return api
            .patch(`${BASE}/${id}`, data)
            .then(res => res.data);
    },

    delete(id) {
        return api
            .delete(`${BASE}/${id}`)
            .then(res => res.data);
    },

    play(id) {
        return api
            .post(`${BASE}/${id}/play`)
            .then(res => res.data);
    },

    view(id) {
        return api
            .post(`${BASE}/${id}/view`)
            .then(res => res.data);
    },

    like(id) {
        return api
            .post(`${BASE}/${id}/like`)
            .then(res => res.data);
    },

    share(id) {
        return api
            .post(`${BASE}/${id}/share`)
            .then(res => res.data);
    }

};

export default episodeApi;