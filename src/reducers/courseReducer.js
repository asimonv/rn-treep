import { courseConstants } from "../constants";

export default function reducer(
  state = {
    selectedCourse: undefined,
    fetchingStats: true,
    fetchingComments: true,
    stats: [],
    comments: []
  },
  action
) {
  switch (action.type) {
    case courseConstants.COURSE_SET: {
      return { ...state, selectedCourse: action.payload };
    }
    case courseConstants.COURSE_STATS_REQUEST: {
      return { ...state, fetchingStats: true };
    }
    case courseConstants.COURSE_STATS_REQUEST_REJECTED: {
      return { ...state, fetchingStats: false, error: action.payload };
    }
    case courseConstants.COURSE_STATS_REQUEST_FULFILLED: {
      return { ...state, fetchingStats: false, stats: action.payload };
    }
    case courseConstants.COURSE_POST_STAT: {
      const { payload: item } = action;
      const prevStats = { ...state.stats };
      const stat = Object.keys(prevStats).find(
        key => prevStats[key].meta.repr === item.voteType
      );
      prevStats[stat].value =
        (prevStats[stat].value * prevStats[stat].votes + item.value) /
        (prevStats[stat].votes + 1);
      prevStats[stat].votes += 1;
      return { ...state, stats: prevStats };
    }
    case courseConstants.COURSE_REMOVE_STAT: {
      const { payload: item } = action;
      const prevStats = { ...state.stats };
      const stat = Object.keys(prevStats).find(
        key => prevStats[key].meta.repr === item.voteType
      );
      prevStats[stat].value =
        prevStats[stat].votes - 1 === 0
          ? 0
          : (prevStats[stat].value * prevStats[stat].votes - item.value) /
            (prevStats[stat].votes - 1);
      prevStats[stat].votes = Math.max(prevStats[stat].votes - 1, 0);
      return { ...state, stats: prevStats };
    }
    case courseConstants.COURSE_GET_COMMENTS: {
      return { ...state, fetchingComments: true };
    }
    case courseConstants.COURSE_GET_COMMENTS_FULFILLED: {
      return { ...state, fetchingComments: false, comments: action.payload };
    }
    case courseConstants.COURSE_GET_COMMENTS_REJECTED: {
      return {
        ...state,
        fetchingComments: false,
        fetchingCommentsError: action.payload
      };
    }
    default:
      return state;
  }
}
