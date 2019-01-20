import { courseConstants } from '../constants';

export const courseSet = (course) => ({
  type: courseConstants.COURSE_SET,
  payload: course,
});

export default { courseSet };
