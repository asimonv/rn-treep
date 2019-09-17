import { teacherConstants } from '../constants';
import teacherService from '../services/teacher';

export const teacherSet = teacher => ({
  type: teacherConstants.TEACHER_SET,
  payload: teacher,
});

const request = ({ teacherId }, constant) => ({
  type: constant,
  teacherId,
});

const success = (res, constant) => ({
  type: constant,
  payload: res,
});

const reject = (e, constant) => ({
  type: constant,
  payload: e,
});

export const postComment = data => async dispatch => {
  dispatch(request(data, teacherConstants.TEACHER_POST_COMMENT));
  try {
    const res = await teacherService.postComment(data);
    dispatch(success(res, teacherConstants.TEACHER_POST_COMMENT_FULFILLED));
  } catch (e) {
    dispatch(reject(e, teacherConstants.TEACHER_POST_COMMENT_REJECTED));
  }
};

export const fetchTeachersStats = data => async dispatch => {
  dispatch(request(data, teacherConstants.TEACHER_STATS_REQUEST));
  try {
    const res = await teacherService.getStats(data);
    dispatch(success(res, teacherConstants.TEACHER_STATS_FULLFILED));
  } catch (e) {
    dispatch(reject(e, teacherConstants.TEACHER_STATS_REJECTED));
  }
};

export const fetchTeacherComments = data => async dispatch => {
  dispatch(request(data, teacherConstants.TEACHER_GET_COMMENTS));
  try {
    const res = await teacherService.getComments(data);
    dispatch(success(res, teacherConstants.TEACHER_GET_COMMENTS_FULFILLED));
  } catch (e) {
    dispatch(reject(e, teacherConstants.TEACHER_GET_COMMENTS_REJECTED));
  }
};

export const teacherSendStat = data => async dispatch => {
  const { action } = data;
  dispatch(
    success(
      data,
      action === 'vote' ? teacherConstants.TEACHER_POST_STAT : teacherConstants.TEACHER_REMOVE_STAT
    )
  );
};
