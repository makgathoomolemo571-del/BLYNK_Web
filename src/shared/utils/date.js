export const formatDate = (date) => {

  if (!date) return null;

  return new Date(date).toLocaleString();

};

export const timeAgo = (date) => {

  const now = new Date();
  const past = new Date(date);

  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;

  return past.toLocaleDateString();

};

export const isExpired = (date) => {

  return new Date(date) < new Date();

};