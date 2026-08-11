const authRoutes = require("./routes/auth.routes");

const authService = require("./services/auth.service");
const authApi = require("./services/auth.api");

const authController = require("./controllers/auth.controller");

const authValidator = require("./validators/login.validator");
const registerValidator = require("./validators/register.validator");
const forgotValidator = require("./validators/forgotPassword.validator");
const resetValidator = require("./validators/resetPassword.validator");

const authDTO = require("./dto/auth.dto");

const authHelpers = require("./utils/auth.helper");

const authSlice = require("./store/authSlice");

const authSelectors = require("./store/authSelectors");
const authActions = require("./store/authActions");

const authConstants = require("./constants/auth.constants");

const useAuth = require("./hooks/useAuth");

/**
 * MODULE EXPORTS
 * Everything auth-related is accessible from one entry
 */

module.exports = {

  // Routes
  routes: authRoutes,

  // Core
  service: authService,
  api: authApi,
  controller: authController,

  // Validation
  validators: {
    login: authValidator,
    register: registerValidator,
    forgot: forgotValidator,
    reset: resetValidator
  },

  // Data layer
  dto: authDTO,

  // Utils
  helpers: authHelpers,

  // Frontend state (for React usage)
  store: {
    slice: authSlice,
    selectors: authSelectors,
    actions: authActions
  },

  // Constants
  constants: authConstants,

  // Hooks
  hooks: {
    useAuth
  }

};