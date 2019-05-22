import { authConstants } from "../constants";

const initialState = {
  user: undefined,
  loadingUser: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_REQUEST: {
      return { ...state, loadingUser: true };
    }

    case authConstants.AUTH_REQUEST_REJECTED: {
      return { ...state, loadingUser: false, error: action.payload };
    }

    case authConstants.AUTH_REQUEST_FULLFILED: {
      return { ...state, loadingUser: false, user: action.payload };
    }

    case authConstants.USER_LOGOUT: {
      return { ...initialState };
    }

    default:
      return state;
  }
}
