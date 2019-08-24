import jsonRequest from "./jsonRequest";
import authHeader from "./authHeader";

//const root = 'https://node-treep.herokuapp.com';
const root = "http://localhost:3000";

export default {
  async getUserVotes() {
    const header = await authHeader();
    return jsonRequest(`${root}/api/users/me/votes/`, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...header }
    });
  },
  async sendStat(data) {
    const header = await authHeader();
    const { courseId, teacherId } = data;
    return jsonRequest(
      `${root}/api/${courseId ? "courses" : "teachers"}/${courseId ||
        teacherId}/stats/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...header },
        body: JSON.stringify(data)
      }
    );
  }
};
