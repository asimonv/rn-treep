import jsonRequest from "./jsonRequest";
import authHeader from "./authHeader";

export default {
  async get(query) {
    const header = await authHeader();
    return jsonRequest(`http://localhost:3000/api/search/${query}`, {
      headers: { "Content-Type": "application/json", ...header }
    });
  }
};
