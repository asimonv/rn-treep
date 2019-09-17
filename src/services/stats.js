import jsonRequest from './jsonRequest';
import authHeader from './authHeader';

const root = 'https://node-treep.herokuapp.com';
// const root = "http://localhost:3000";

export default {
  //  could have been a single func that recieves a resource name
  async getStats() {
    const header = await authHeader();
    return jsonRequest(`${root}/api/stats`, {
      headers: { 'Content-Type': 'application/json', ...header },
    });
  },
  async getStat(endpoint) {
    const header = await authHeader();
    return jsonRequest(`${root}/api/stats/${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...header },
    });
  },
};
