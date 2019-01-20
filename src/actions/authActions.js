import authService from '../services/auth';
import { authConstants } from '../constants';

const requestAuth = (data) => ({
  type: authConstants.AUTH_REQUEST,
  data,
});

const receiveResponse = (data, res) => ({
  type: authConstants.AUTH_REQUEST_FULLFILED,
  payload: res,
  data,
});

const rejectResponse = data => ({
  type: authConstants.AUTH_REQUEST_REJECTED,
  payload: data.error,
  data,
});

export const signIn = (data) => {
  return function (dispatch) {
    dispatch(requestAuth(data));
    authService.signIn(data)
      .then(user => {
        dispatch(receiveResponse(data, user));
      })
      .catch(error => {
        dispatch(rejectResponse(data));
      });
  };
};

export default { signIn };
