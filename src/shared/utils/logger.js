const isDev = import.meta.env.DEV;

const log = (type, message, data) => {
  if (!isDev) return;

  console.log(
    `[${type}] ${message}`,
    data ? data : ""
  );
};

export const logger = {
  info: (msg, data) => log("INFO", msg, data),

  warn: (msg, data) => log("WARN", msg, data),

  error: (msg, data) => log("ERROR", msg, data),

  debug: (msg, data) => log("DEBUG", msg, data)
};