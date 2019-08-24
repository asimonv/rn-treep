import jsonRequest from "./jsonRequest";

//const root = 'https://node-treep.herokuapp.com';
const root = "http://localhost:3000";

export default {
  async signIn(data) {
    return jsonRequest(`${root}/api/auth/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  }
};
