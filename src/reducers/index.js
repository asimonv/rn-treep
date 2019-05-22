import { combineReducers } from "redux";

import auth from "./authReducer";
import course from "./courseReducer";
import teacher from "./teacherReducer";
import user from "./userReducer";

export default combineReducers({
  auth,
  course,
  teacher,
  user
});
