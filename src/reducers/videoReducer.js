import { getVideo, getVideoDetail } from "../api/video";
export const initState = {
  video: null,
  videos: [],
};

// 액션 함수들 정의 따로
export const fetchVideo = async (dispatch, videoCode) => {
  const response = await getVideoDetail(videoCode);
  dispatch({ type: "FETCH_VIDEO", payload: response.data });
};

export const fetchVideos = async (dispatch, page, keyword = "") => {
  const response = await getVideo(page, keyword);
  dispatch({ type: "FETCH_VIDEOS", payload: response.data });
};

export const videoReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_VIDEO":
      return { ...state, video: action.payload };
    // 스프레드연산자로 기존껀 살려야함!
    case "FETCH_VIDEOS":
      return { ...state, videos: action.payload };
  }
};
