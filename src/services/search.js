import jsonRequest from './jsonRequest';

export default {
  async get(query) {
    return jsonRequest(`http://localhost:3000/search/${query}`);
  },
};
