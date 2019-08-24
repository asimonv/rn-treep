import jsonRequest from "./jsonRequest";
import authHeader from "./authHeader";

//const root = 'https://node-treep.herokuapp.com';
const root = "http://localhost:3000";

export default {
  async get(query) {
    const header = await authHeader();
    return jsonRequest(`${root}/api/search/${query}`, {
      headers: { "Content-Type": "application/json", ...header }
    });
  }
};
