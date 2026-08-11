import api from "../../../config/api";


const BASE_URL = "/messages";


/**
 * ======================================
 * CREATE MESSAGE
 * POST /messages
 * ======================================
 */
export const createMessage = async (payload) => {
  const { data } = await api.post(
    BASE_URL,
    payload
  );

  return data;
};


/**
 * ======================================
 * GET CONVERSATION MESSAGES
 * GET /messages/conversation/:conversationId
 * ======================================
 */
export const getConversationMessages = async (
  conversationId,
  params = {}
) => {

  const { data } = await api.get(
    `${BASE_URL}/conversation/${conversationId}`,
    {
      params
    }
  );

  return data;
};


/**
 * ======================================
 * GET MESSAGE
 * GET /messages/:id
 * ======================================
 */
export const getMessageById = async (id) => {

  const { data } = await api.get(
    `${BASE_URL}/${id}`
  );

  return data;
};


/**
 * ======================================
 * UPDATE MESSAGE
 * PATCH /messages/:id
 * ======================================
 */
export const updateMessage = async (
  id,
  payload
) => {

  const { data } = await api.patch(
    `${BASE_URL}/${id}`,
    payload
  );

  return data;
};


/**
 * ======================================
 * DELETE MESSAGE
 * DELETE /messages/:id
 * ======================================
 */
export const deleteMessage = async (id) => {

  const { data } = await api.delete(
    `${BASE_URL}/${id}`
  );

  return data;
};


/**
 * ======================================
 * DELETE FOR EVERYONE
 * ======================================
 */
export const deleteMessageForEveryone = async (
  id
) => {

  const { data } = await api.delete(
    `${BASE_URL}/${id}/everyone`
  );

  return data;
};


/**
 * ======================================
 * REPLY
 * POST /messages/:id/reply
 * ======================================
 */
export const replyMessage = async (
  id,
  payload
) => {

  const { data } = await api.post(
    `${BASE_URL}/${id}/reply`,
    payload
  );

  return data;
};


/**
 * ======================================
 * FORWARD
 * POST /messages/:id/forward
 * ======================================
 */
export const forwardMessage = async (
  id,
  payload
) => {

  const { data } = await api.post(
    `${BASE_URL}/${id}/forward`,
    payload
  );

  return data;
};


/**
 * ======================================
 * REACT
 * POST /messages/:id/react
 * ======================================
 */
export const reactMessage = async (
  id,
  payload
) => {

  const { data } = await api.post(
    `${BASE_URL}/${id}/react`,
    payload
  );

  return data;
};


/**
 * ======================================
 * REMOVE REACTION
 * DELETE /messages/:id/react
 * ======================================
 */
export const removeReaction = async (
  id
) => {

  const { data } = await api.delete(
    `${BASE_URL}/${id}/react`
  );

  return data;
};


/**
 * ======================================
 * MARK READ
 * POST /messages/:id/read
 * ======================================
 */
export const markMessageRead = async (
  id
) => {

  const { data } = await api.post(
    `${BASE_URL}/${id}/read`
  );

  return data;
};


/**
 * ======================================
 * PIN MESSAGE
 * POST /messages/:id/pin
 * ======================================
 */
export const pinMessage = async (
  id
) => {

  const { data } = await api.post(
    `${BASE_URL}/${id}/pin`
  );

  return data;
};


/**
 * ======================================
 * UNPIN MESSAGE
 * DELETE /messages/:id/pin
 * ======================================
 */
export const unpinMessage = async (
  id
) => {

  const { data } = await api.delete(
    `${BASE_URL}/${id}/pin`
  );

  return data;
};


/**
 * ======================================
 * STAR MESSAGE
 * POST /messages/:id/star
 * ======================================
 */
export const starMessage = async (
  id
) => {

  const { data } = await api.post(
    `${BASE_URL}/${id}/star`
  );

  return data;
};


/**
 * ======================================
 * UNSTAR MESSAGE
 * DELETE /messages/:id/star
 * ======================================
 */
export const unstarMessage = async (
  id
) => {

  const { data } = await api.delete(
    `${BASE_URL}/${id}/star`
  );

  return data;
};


/**
 * ======================================
 * SHARE MESSAGE
 * POST /messages/:id/share
 * ======================================
 */
export const shareMessage = async (
  id,
  payload
) => {

  const { data } = await api.post(
    `${BASE_URL}/${id}/share`,
    payload
  );

  return data;
};


/**
 * ======================================
 * UPLOAD ATTACHMENT
 * POST /messages/upload
 * ======================================
 */
export const uploadAttachment = async (
  formData
) => {

  const { data } = await api.post(
    `${BASE_URL}/upload`,
    formData,
    {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }
  );

  return data;
};


/**
 * ======================================
 * SEARCH MESSAGES
 * GET /messages/search/:conversationId
 * ======================================
 */
export const searchMessages = async (
  conversationId,
  params={}
) => {

  const { data } = await api.get(
    `${BASE_URL}/search/${conversationId}`,
    {
      params
    }
  );

  return data;
};



const messageApi = {

  createMessage,

  getConversationMessages,

  getMessageById,

  updateMessage,

  deleteMessage,

  deleteMessageForEveryone,

  replyMessage,

  forwardMessage,

  reactMessage,

  removeReaction,

  markMessageRead,

  pinMessage,

  unpinMessage,

  starMessage,

  unstarMessage,

  shareMessage,

  uploadAttachment,

  searchMessages

};


export default messageApi;