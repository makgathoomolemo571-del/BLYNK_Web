export const unique = (arr) => [...new Set(arr)];

export const removeById = (arr, id) =>
  arr.filter(item => item.id !== id);

export const updateById = (arr, id, newItem) =>
  arr.map(item => item.id === id ? newItem : item);

export const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {

    const group = item[key];

    if (!acc[group]) acc[group] = [];

    acc[group].push(item);

    return acc;

  }, {});

export const sortByDate = (arr, field = "createdAt") =>
  [...arr].sort((a, b) =>
    new Date(b[field]) - new Date(a[field])
  );