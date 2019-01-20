import { teacherConstants } from '../constants';

export const teacherSet = (teacher) => ({
  type: teacherConstants.TEACHER_SET,
  payload: teacher,
});

export default { teacherSet };
