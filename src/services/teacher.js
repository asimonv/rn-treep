import jsonRequest from "./jsonRequest";
import authHeader from "./authHeader";

export default {
  //  could have been a single func that recieves a resource name
  async getComments(data) {
    const header = await authHeader();
    return jsonRequest(
      `http://localhost:3000/api/teachers/${data.teacherId}/comments/`,
      {
        headers: { "Content-Type": "application/json", ...header }
      }
    );
  },
  async getStats(data) {
    const header = await authHeader();
    return jsonRequest(
      `http://localhost:3000/api/teachers/${data.teacherId}/stats/`,
      {
        headers: { "Content-Type": "application/json", ...header }
      }
    );
  }
};
