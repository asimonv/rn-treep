import authService from "../services/auth";
import { authConstants } from "../constants";

const request = (constant, data) => ({
  type: authConstants.AUTH_REQUEST,
  data
});

const success = (constant, data, res) => ({
  type: authConstants.AUTH_REQUEST_FULLFILED,
  payload: res,
  data
});

const reject = (constant, data) => ({
  type: authConstants.AUTH_REQUEST_REJECTED,
  payload: data
});

export const signIn = data => {
  return function(dispatch) {
    dispatch(request(authConstants.AUTH_REQUEST, data));
    authService
      .signIn(data)
      .then(user => {
        dispatch(success(authConstants.AUTH_REQUEST_FULLFILED, data, user));
      })
      .catch(error => {
        dispatch(reject(authConstants.AUTH_REQUEST_REJECTED, error));
      });
  };
};

export const logoutUser = () => dispatch => {
  dispatch(request(authConstants.USER_LOGOUT));
};

export default { signIn };
