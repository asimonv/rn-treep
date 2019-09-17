import { userConstants } from '../constants';

const initialState = {
  votes: undefined,
  fetchingVotes: false,
  errorFetchingVotes: false,
  errorSendingStat: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.USER_GET_VOTES: {
      return { ...state, fetchingVotes: true };
    }
    case userConstants.USER_GET_VOTES_REJECTED: {
      return {
        ...state,
        fetchingVotes: true,
        errorFetchingVotes: action.payload,
      };
    }
    case userConstants.USER_GET_VOTES_FULFILLED: {
      return { ...state, fetchingVotes: false, votes: action.payload };
    }
    case userConstants.USER_SEND_STAT: {
      return { ...state, sendingStat: true };
    }
    case userConstants.USER_SEND_STAT_FULFILLED: {
      const prevVotes = state.votes;
      const { payload: item } = action;
      const found = prevVotes.find(x => x.id === item.id);
      const votes = found
        ? prevVotes.map(x => (x.id === item.id ? item : x))
        : [...prevVotes, item];
      return { ...state, sendingStat: false, votes };
    }
    case userConstants.USER_SEND_STAT_REJECTED: {
      return { ...state, sendingStat: false, errorSendingStat: action.payload };
    }
    case userConstants.USER_REMOVE_STAT: {
      return { ...state, removingStat: true };
    }
    case userConstants.USER_REMOVE_STAT_FULFILLED: {
      const prevVotes = state.votes;
      const { payload } = action;
      const newVotes = prevVotes.filter(
        v => !(v.voteType === payload.voteType && v.teacherId === payload.teacherId)
      );
      return { ...state, removingStat: false, votes: newVotes };
    }
    case userConstants.USER_REMOVE_STAT_REJECTED: {
      return {
        ...state,
        removingStat: false,
        errorRemovingStat: action.payload,
      };
    }
    default:
      return state;
  }
}
