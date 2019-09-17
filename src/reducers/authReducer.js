import { authConstants } from '../constants';

const initialState = {
  user: undefined,
  loadingUser: false,
  error: null,
  signingOut: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case authConstants.AUTH_REQUEST: {
      return { ...state, loadingUser: true, error: null };
    }

    case authConstants.AUTH_REQUEST_REJECTED: {
      const {
        output: {
          payload: { error, message },
        },
      } = action.payload;
      const errorMessage = `${error}: ${message}`;
      return { ...state, loadingUser: false, error: errorMessage };
    }

    case authConstants.AUTH_REQUEST_FULLFILED: {
      return { ...state, loadingUser: false, user: action.payload };
    }

    case authConstants.AUTH_LOGOUT_FULLFILED: {
      return { ...initialState };
    }

    case authConstants.AUTH_LOGOUT: {
      return { ...state, signingOut: true, error: null };
    }

    case authConstants.AUTH_LOGOUT_REJECTED: {
      return { ...state, signingOut: false, error: action.payload };
    }

    default:
      return state;
  }
}
