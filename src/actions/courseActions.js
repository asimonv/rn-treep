import { courseConstants } from "../constants";
import courseService from "../services/course";

export const courseSet = course => ({
  type: courseConstants.COURSE_SET,
  payload: course
});

const request = ({ teacherId }, constant) => ({
  type: constant,
  teacherId
});

const success = (res, constant) => ({
  type: constant,
  payload: res
});

const reject = (e, constant) => ({
  type: constant,
  payload: e
});

export const fetchCourseStats = data => async dispatch => {
  dispatch(request(data, courseConstants.COURSE_STATS_REQUEST));
  try {
    const res = await courseService.getStats(data);
    dispatch(success(res, courseConstants.COURSE_STATS_REQUEST_FULFILLED));
  } catch (e) {
    dispatch(reject(e, courseConstants.COURSE_STATS_REQUEST_REJECTED));
  }
};

export const fetchCourseComments = data => async dispatch => {
  dispatch(request(data, courseConstants.COURSE_GET_COMMENTS));
  try {
    const res = await courseService.getComments(data);
    dispatch(success(res, courseConstants.COURSE_GET_COMMENTS_FULFILLED));
  } catch (e) {
    dispatch(reject(e, courseConstants.COURSE_GET_COMMENTS_REJECTED));
  }
};

export const courseSendStat = data => async dispatch => {
  const { action } = data;
  dispatch(
    success(
      data,
      action === "vote"
        ? courseConstants.COURSE_POST_STAT
        : courseConstants.COURSE_REMOVE_STAT
    )
  );
};

export default { courseSet };
