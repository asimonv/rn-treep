import { authConstants } from '../constants';

export default function reducer(state = {
  user: undefined,
  loadingUser: false,
  error: null,
}, action) {
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

    default:
      return state;
  }
}
