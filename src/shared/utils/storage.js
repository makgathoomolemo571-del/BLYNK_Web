const PREFIX = "blynk_";

export const storage = {

  set: (key, value) => {

    localStorage.setItem(
      PREFIX + key,
      JSON.stringify(value)
    );

  },

  get: (key) => {

    const value = localStorage.getItem(PREFIX + key);

    return value ? JSON.parse(value) : null;

  },

  remove: (key) => {

    localStorage.removeItem(PREFIX + key);

  },

  clear: () => {

    Object.keys(localStorage)
      .forEach((key) => {

        if (key.startsWith(PREFIX)) {

          localStorage.removeItem(key);

        }

      });

  }

};