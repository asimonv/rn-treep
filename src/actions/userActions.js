import { userConstants, teacherConstants } from "../constants";
import userService from "../services/user";

const request = (constant, payload) => ({
  type: constant,
  payload
});

const reject = (err, constant) => ({
  type: constant,
  payload: err
});

const success = (res, constant) => ({
  type: constant,
  payload: res
});

export const getUserVotes = () => async dispatch => {
  dispatch(request(userConstants.USER_GET_VOTES));
  try {
    const res = await userService.getUserVotes();
    dispatch(success(res, userConstants.USER_GET_VOTES_FULFILLED));
  } catch (e) {
    dispatch(reject(e, userConstants.USER_GET_VOTES_REJECTED));
  }
};

export const sendStat = data => async dispatch => {
  const { action } = data;
  dispatch(
    request(
      action === "vote"
        ? userConstants.USER_SEND_STAT
        : userConstants.USER_REMOVE_STAT,
      data
    )
  );
  try {
    const res = await userService.sendStat(data);
    dispatch(
      success(
        res,
        action === "vote"
          ? userConstants.USER_SEND_STAT_FULFILLED
          : userConstants.USER_REMOVE_STAT_FULFILLED
      )
    );
  } catch (e) {
    dispatch(
      reject(
        e,
        action === "vote"
          ? userConstants.USER_SEND_STAT_REJECTED
          : userConstants.USER_REMOVE_STAT_REJECTED
      )
    );
  }
};
