const routes = require("./routes/profile.routes");

const dto = require("./dto/profile.dto");
const constants = require("./constants/profile.constants");
const types = require("./types/profile.types");
const validators = require("./validators/profile.validator");

module.exports = {
  routes,
  dto,
  constants,
  types,
  validators,
};