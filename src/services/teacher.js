import jsonRequest from "./jsonRequest";
import authHeader from "./authHeader";

export default {
  async getStats(data) {
    const header = await authHeader();
    return jsonRequest(
      `http://localhost:3000/api/teachers/${data.teacherId}/stats/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", ...header },
        body: JSON.stringify(data)
      }
    );
  }
};