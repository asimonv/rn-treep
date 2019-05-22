import { AsyncStorage } from "react-native";

export default async function authHeader() {
  // return authorization header with jwt token
  try {
    const rawUser = await AsyncStorage.getItem("user");
    const stringUser = rawUser.toString();
    if (stringUser) {
      return { Authorization: `Bearer ${stringUser}` };
    }
  } catch (e) {
    return { error: e };
  }
  return {};
}
