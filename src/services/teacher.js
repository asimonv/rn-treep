import jsonRequest from './jsonRequest';

export default {
  async getStats(teacherId, userId) {
    return jsonRequest(`http://localhost:3000/teachers/${teacherId}/stats/${userId}`);
  },
};
