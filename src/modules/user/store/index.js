import userSlice from "./userSlice";
import * as userSelectors from "./userSelectors";
import * as userActions from "./userActions";

export {
  userSlice,
  userSelectors,
  userActions
};

export default {
  slice: userSlice,
  selectors: userSelectors,
  actions: userActions
};