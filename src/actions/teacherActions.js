import { teacherConstants } from '../constants';
import teacherService from '../services/teacher';

export const teacherSet = (teacher) => ({
  type: teacherConstants.TEACHER_SET,
  payload: teacher,
});

const requestStats = (teacherId, userId) => ({
  type: teacherConstants.TEACHER_STATS_REQUEST,
  teacherId,
  userId,
});

const receiveStats = (teacherId, userId, res) => ({
  type: teacherConstants.TEACHER_STATS_FULLFILED,
  payload: res,
});

const rejectResponse = res => ({
  type: teacherConstants.TEACHER_STATS_REJECTED,
  payload: data.error,
});

export const fetchTeachersStats = (teacherId, userId) => async (dispatch) => {
  dispatch(requestStats(teacherId, userId));
  const res = await teacherService.getStats(teacherId, userId);
  dispatch(receiveStats(teacherId, userId, res));
};

export default { teacherSet, fetchTeachersStats };
