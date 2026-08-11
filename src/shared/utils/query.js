export const buildQuery = (params = {}) => {
  const query = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== undefined && value !== null) {
      query.append(key, value);
    }
  });

  return query.toString();
};

export const parseQuery = (search) => {
  return Object.fromEntries(new URLSearchParams(search));
};

export const paginate = (page = 1, limit = 20) => {
  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};