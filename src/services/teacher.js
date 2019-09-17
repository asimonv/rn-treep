import jsonRequest from './jsonRequest';
import authHeader from './authHeader';

const root = 'https://node-treep.herokuapp.com';
// const root = "http://localhost:3000";

export default {
  //  could have been a single func that recieves a resource name
  async getComments(data) {
    const header = await authHeader();
    return jsonRequest(`${root}/api/teachers/${data.teacherId}/comments/`, {
      headers: { 'Content-Type': 'application/json', ...header },
    });
  },
  async postComment(data) {
    const header = await authHeader();
    return jsonRequest(`${root}/api/teachers/${data.teacherId}/comments/`, {
      body: JSON.stringify(data),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
    });
  },
  async getStats(data) {
    const header = await authHeader();
    return jsonRequest(`${root}/api/teachers/${data.teacherId}/stats/`, {
      headers: { 'Content-Type': 'application/json', ...header },
    });
  },
};
