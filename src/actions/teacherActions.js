import { teacherConstants } from "../constants";
import teacherService from "../services/teacher";

export const teacherSet = teacher => ({
  type: teacherConstants.TEACHER_SET,
  payload: teacher
});

const requestStats = ({ teacherId }) => ({
  type: teacherConstants.TEACHER_STATS_REQUEST,
  teacherId
});

const receiveStats = (data, res) => ({
  type: teacherConstants.TEACHER_STATS_FULLFILED,
  payload: res
});

const rejectResponse = e => ({
  type: teacherConstants.TEACHER_STATS_REJECTED,
  payload: e
});

export const fetchTeachersStats = data => async dispatch => {
  dispatch(requestStats(data));
  try {
    const res = await teacherService.getStats(data);
    dispatch(receiveStats(data, res));
  } catch (e) {
    dispatch(rejectResponse(e));
  }
};

export default { teacherSet, fetchTeachersStats };
