import { teacherConstants } from '../constants';

export default function reducer(state = {
  selectedTeacher: undefined,
  fetchingStats: true,
  stats: undefined,
}, action) {
  switch (action.type) {
    case teacherConstants.TEACHER_SET: {
      return { ...state, selectedTeacher: action.payload };
    }
    case teacherConstants.TEACHER_STATS_REQUEST: {
      return { ...state, fetchingStats: true };
    }
    case teacherConstants.TEACHER_STATS_REJECTED: {
      return { ...state, fetchingStats: false, error: action.payload };
    }
    case teacherConstants.TEACHER_STATS_FULLFILED: {
      return { ...state, fetchingStats: false, stats: action.payload };
    }
    default:
      return state;
  }
}
