import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});
const authorize = axios.create({
  baseURL: "http://localhost:8080/api/private/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// 인증된 사람만 가능한 작업들은 추가로 헤더에 아래 양식처럼 보내줘야함

export const subInsert = async (data) => {
  return await authorize.post("sub", data); // 컨트롤러에서 requsetbody면 이렇게 보냄
};
export const subRemove = async (subCode) => {
  return await authorize.delete(`sub/${subCode}`); // 컨트롤러에서 pathVariable일떄
};
export const getSub = async (channelCode) => {
  console.log("getSub 까지온다");
  return await authorize.get(`sub/${channelCode}`);
};

export const countSub = async (channelCode) => {
  return await instance.get(`sub/${channelCode}/count`);
};
