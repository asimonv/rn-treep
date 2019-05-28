import jsonRequest from "./jsonRequest";
import authHeader from "./authHeader";

export default {
  //  could have been a single func that recieves a resource name
  async getStats() {
    const header = await authHeader();
    return jsonRequest(`http://localhost:3000/api/stats`, {
      headers: { "Content-Type": "application/json", ...header }
    });
  },
  async getStat(endpoint) {
    const header = await authHeader();
    return jsonRequest(`http://localhost:3000/api/stats/${endpoint}`, {
      headers: { "Content-Type": "application/json", ...header }
    });
  }
};
