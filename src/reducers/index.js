import { combineReducers } from 'redux';

import auth from './authReducer';
import course from './courseReducer';
import teacher from './teacherReducer';


export default combineReducers({
  auth,
  course,
  teacher,
});
