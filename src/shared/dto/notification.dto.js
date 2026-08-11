export const NotificationDTO = (data) => {
  return {
    id: data?._id,
    title: data?.title,
    message: data?.message,
    type: data?.type,
    read: data?.read || false,
    isBroadcast: data?.isBroadcast || false,
    createdAt: data?.createdAt
  };
};