import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});
export const getVideo = async (page, keyword = "") => {
  // 디폴트 page 1페이지로 설정
  console.log("오긴하냐 : " + keyword);
  return await instance.get("video", {
    params: {
      page: page,
      keyword: keyword,
    },
  });
};
export const addVideo = async (data) => {
  return await instance.post("video", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const getVideoDetail = async (videoCode) => {
  console.log(videoCode);
  return await instance.get(`video/${videoCode}`);
};
