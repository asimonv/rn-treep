import jsonRequest from './jsonRequest';

export default {
  async signIn(data) {
    return jsonRequest(`http://localhost:3000/signin/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  },
};
