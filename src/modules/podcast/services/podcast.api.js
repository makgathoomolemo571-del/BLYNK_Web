// modules/podcast/services/podcast.api.js

import api from "../../../config/api";

/*
|--------------------------------------------------------------------------
| PODCAST API
|--------------------------------------------------------------------------
| Backend:
|
| POST    /api/podcasts
| GET     /api/podcasts/:id
| PATCH   /api/podcasts/:id
| DELETE  /api/podcasts/:id
|
| POST    /api/podcasts/:id/subscribe
| POST    /api/podcasts/:id/unsubscribe
|
| GET     /api/podcasts/my
|--------------------------------------------------------------------------
*/

const BASE = "/podcasts";

const podcastAPI = {

  /*
  |--------------------------------------------------------------------------
  | CREATE PODCAST
  |--------------------------------------------------------------------------
  */

  async create(data) {

    const response =
      await api.post(
        BASE,
        data
      );

    return response.data;
  },

   async getByName(name) {
    const { data } = await api.get(
      `${BASE}/name/${encodeURIComponent(name)}`
    );
    return data;
  },

  

async publish(id) {

    const response = await api.patch(
        `/podcasts/${id}/publish`
    );

    return response.data;

},

  // GET ALL PODCASTS
async getAll() {

    const response = await api.get(BASE);

    return response.data;

},

  /*
  |--------------------------------------------------------------------------
  | GET MY PODCASTS
  |--------------------------------------------------------------------------
  */

  async getMine() {

    const response =
      await api.get(
        `${BASE}/my`
      );

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | GET SINGLE PODCAST
  |--------------------------------------------------------------------------
  */

  async getById(id) {

    const response =
      await api.get(
        `${BASE}/${id}`
      );

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | UPDATE PODCAST
  |--------------------------------------------------------------------------
  */

  async update(id, data) {

    const response =
      await api.patch(
        `${BASE}/${id}`,
        data
      );

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | DELETE PODCAST
  |--------------------------------------------------------------------------
  */

  async remove(id) {

    const response =
      await api.delete(
        `${BASE}/${id}`
      );

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | SUBSCRIBE
  |--------------------------------------------------------------------------
  */

  async subscribe(id) {

    const response =
      await api.post(
        `${BASE}/${id}/subscribe`
      );

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | UNSUBSCRIBE
  |--------------------------------------------------------------------------
  */

  async unsubscribe(id) {

    const response =
      await api.post(
        `${BASE}/${id}/unsubscribe`
      );

    return response.data;
  }

};

export default podcastAPI;