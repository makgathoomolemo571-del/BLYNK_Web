export const debounce = (func, delay = 300) => {

  let timer;

  return (...args) => {

    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(null, args);
    }, delay);

  };

};