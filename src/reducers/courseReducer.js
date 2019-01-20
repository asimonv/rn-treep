import { courseConstants } from '../constants';

export default function reducer(state = {
  selectedCourse: undefined,
}, action) {
  switch (action.type) {
    case courseConstants.COURSE_SET: {
      return { ...state, selectedCourse: action.payload };
    }

    default:
      return state;
  }
}
