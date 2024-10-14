import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/member/",
});
export const signup = async (data) => {
  // 파라미터로 data 받아서감 (바디로 받음)
  return await instance.post("signup", data);
};
export const login = async (data) => {
  try {
    return await instance.post("login", data);
  } catch (error) {
    new Error("LOGIN");
  }
};
