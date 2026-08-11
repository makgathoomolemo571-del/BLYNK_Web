import api from "../../../config/api";

const BASE = "/conversations";

/*
|--------------------------------------------------------------------------
| Create Conversation
|--------------------------------------------------------------------------
*/

const create = async (payload) => {
  const { data } = await api.post(BASE, payload);
  return data;
};

/*
|--------------------------------------------------------------------------
| Get My Conversations
|--------------------------------------------------------------------------
*/

const getMine = async () => {
  const { data } = await api.get(BASE);
  return data;
};

/*
|--------------------------------------------------------------------------
| Get Conversation
|--------------------------------------------------------------------------
*/

const getById = async (id) => {
  const { data } = await api.get(`${BASE}/${id}`);
  return data;
};

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

const update = async (id, payload) => {
  const { data } = await api.patch(
    `${BASE}/${id}`,
    payload
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

const remove = async (id) => {
  const { data } = await api.delete(
    `${BASE}/${id}`
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Archive
|--------------------------------------------------------------------------
*/

const archive = async (id) => {
  const { data } = await api.patch(
    `${BASE}/${id}/archive`
  );

  return data;
};

const unarchive = async (id) => {
  const { data } = await api.patch(
    `${BASE}/${id}/unarchive`
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Mute
|--------------------------------------------------------------------------
*/

const mute = async (id) => {
  const { data } = await api.patch(
    `${BASE}/${id}/mute`
  );

  return data;
};

const unmute = async (id) => {
  const { data } = await api.patch(
    `${BASE}/${id}/unmute`
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Pin
|--------------------------------------------------------------------------
*/

const pin = async (id) => {
  const { data } = await api.patch(
    `${BASE}/${id}/pin`
  );

  return data;
};

const unpin = async (id) => {
  const { data } = await api.patch(
    `${BASE}/${id}/unpin`
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Participants
|--------------------------------------------------------------------------
*/

const addParticipant = async (
  conversationId,
  userId
) => {
  const { data } = await api.post(
    `${BASE}/${conversationId}/participants`,
    { userId }
  );

  return data;
};

const removeParticipant = async (
  conversationId,
  userId
) => {
  const { data } = await api.delete(
    `${BASE}/${conversationId}/participants/${userId}`
  );

  return data;
};

/*
|--------------------------------------------------------------------------
| Leave Conversation
|--------------------------------------------------------------------------
*/

const leave = async (id) => {
  const { data } = await api.post(
    `${BASE}/${id}/leave`
  );

  return data;
};

export default {
  create,
  getMine,
  getById,
  update,
  remove,
  archive,
  unarchive,
  mute,
  unmute,
  pin,
  unpin,
  addParticipant,
  removeParticipant,
  leave
};