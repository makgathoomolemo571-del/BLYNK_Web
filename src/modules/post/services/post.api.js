import api from "../../../config/api";

const BASE = "/posts";

const postApi = {

  create(data) {
    return api.post(`${BASE}/create`, data)
      .then(res => res.data);
  },

  getFeed() {
    return api.get(`${BASE}/feed`)
      .then(res => res.data);
  },

  save(id) {
    return api.post(`${BASE}/${id}/save`)
        .then(res => res.data);
},

unsave(id) {
    return api.delete(`${BASE}/${id}/save`)
        .then(res => res.data);
},

  getSaved() {
    return api.get(`${BASE}/saved`)
      .then(res => res.data);
  },

  getById(id) {
    return api.get(`${BASE}/${id}`)
      .then(res => res.data);
  },

  update(id,data){
    return api.patch(`${BASE}/${id}`,data)
      .then(res=>res.data);
  },

  delete(id){
    return api.delete(`${BASE}/${id}`)
      .then(res=>res.data);
  },

  like(id){
    return api.post(`${BASE}/${id}/like`)
      .then(res=>res.data);
  },

  unlike(id){
    return api.post(`${BASE}/${id}/unlike`)
      .then(res=>res.data);
  },

  comment(id,text){
    return api.post(`${BASE}/${id}/comment`,{
      text
    }).then(res=>res.data);
  },

  reply(postId, commentId, text) {
  return api.post(
    `${BASE}/${postId}/comment/${commentId}/reply`,
    { text }
  ).then(res => res.data);
},

likeComment(postId, commentId) {
  return api.post(
    `${BASE}/${postId}/comment/${commentId}/like`
  ).then(res => res.data);
},

unlikeComment(postId, commentId) {
  return api.post(
    `${BASE}/${postId}/comment/${commentId}/unlike`
  ).then(res => res.data);
},

deleteComment(postId, commentId) {
  return api.delete(
    `${BASE}/${postId}/comment/${commentId}`
  ).then(res => res.data);
},

likeReply(postId, commentId, replyId) {
  return api.post(
    `${BASE}/${postId}/comment/${commentId}/reply/${replyId}/like`
  ).then(res => res.data);
},

unlikeReply(postId, commentId, replyId) {
  return api.post(
    `${BASE}/${postId}/comment/${commentId}/reply/${replyId}/unlike`
  ).then(res => res.data);
},

deleteReply(postId, commentId, replyId) {
  return api.delete(
    `${BASE}/${postId}/comment/${commentId}/reply/${replyId}`
  ).then(res => res.data);
},

  share(id){
    return api.post(`${BASE}/${id}/share`)
      .then(res=>res.data);
  },

  report(id,reason){
    return api.post(`${BASE}/${id}/report`,{
      reason
    }).then(res=>res.data);
  }

};

export default postApi;