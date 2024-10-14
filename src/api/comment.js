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

// 비디오 코드로 그 비디오의 모든 댓글

export const viewComments = async (videoCode) => {
  return await instance.get(`video/${videoCode}/comment`);
};

// 댓글 달기
export const addComment = async (data) => {
  return await authorize.post("comment", data);
};

export const updateComment = async (data) => {
  return await authorize.put("comment", data);
};

// 댓글 삭제
export const deleteComment = async (commentCode) => {
  return await authorize.delete(`comment/${commentCode}`);
};
