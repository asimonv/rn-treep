import { teacherConstants } from '../constants';

export default function reducer(state = {
  selectedTeacher: undefined,
}, action) {
  switch (action.type) {
    case teacherConstants.TEACHER_SET: {
      return { ...state, selectedTeacher: action.payload };
    }

    default:
      return state;
  }
}
