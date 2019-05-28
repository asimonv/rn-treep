import jsonRequest from "./jsonRequest";
import authHeader from "./authHeader";

export default {
  async getUserVotes() {
    const header = await authHeader();
    return jsonRequest(`http://localhost:3000/api/users/me/votes/`, {
      method: "GET",
      headers: { "Content-Type": "application/json", ...header }
    });
  },
  async sendStat(data) {
    const header = await authHeader();
    const { courseId, teacherId } = data;
    return jsonRequest(
      `http://localhost:3000/api/${
        courseId ? "courses" : "teachers"
      }/${courseId || teacherId}/stats/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...header },
        body: JSON.stringify(data)
      }
    );
  }
};
