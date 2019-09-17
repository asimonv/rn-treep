import authService from '../services/auth';
import { authConstants } from '../constants';

const request = (constant, data) => ({
  type: constant,
  data,
});

const success = (constant, data, res) => ({
  type: constant,
  payload: res,
  data,
});

const reject = (constant, data) => ({
  type: constant,
  payload: data,
});

export const signIn = data => async dispatch => {
  dispatch(request(authConstants.AUTH_REQUEST, data));
  try {
    const res = await authService.signIn(data);
    dispatch(success(authConstants.AUTH_REQUEST_FULLFILED, data, res));
  } catch (e) {
    dispatch(reject(authConstants.AUTH_REQUEST_REJECTED, e));
  }
};

export const logoutUser = () => async dispatch => {
  dispatch(request(authConstants.AUTH_LOGOUT));
  try {
    const res = await authService.signOut();
    dispatch(success(authConstants.AUTH_LOGOUT_FULLFILED, res));
  } catch (e) {
    dispatch(reject(authConstants.AUTH_LOGOUT_REJECTED, e));
  }
};

export default { signIn };
