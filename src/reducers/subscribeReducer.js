import { subInsert, subRemove, countSub, getSub } from "../api/subscribe";

export const initState = {
  count: 0, // 구독자수
  isSub: false, // 구독 체크 여부
  sub: null, // 구독정보
};

export const subscribe = async (dispatch, data) => {
  const response = await subInsert(data);
  dispatch({ type: "ADD_SUBSCRIBE" });
};

export const unsubscribe = async (dispatch, subCode) => {
  const response = await subRemove(subCode);
  dispatch({ type: "REMOVE_SUBSCRIBE" });
};

export const subCount = async (dispatch, channelCode) => {
  const response = await countSub(channelCode);
  dispatch({ type: "COUNT_SUBSCRIBE", payload: response.data });
};

export const subGet = async (dispatch, channelCode) => {
  try {
    const response = await getSub(channelCode);
    if (response.data !== "") {
      console.log("반환 데이터");
      console.log(response.data);
      dispatch({ type: "GET_SUBSCRIBE", payload: response.data });
    } else {
      dispatch({ type: "GET_SUBSCRIBE_ERROR" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const subscribeResucer = (state, action) => {
  switch (action.type) {
    case "ADD_SUBSCRIBE": // 구독
      return {
        ...state,
        isSub: true, // 구독여부 true로
        count: state.count + 1, // 구독자수 +1
      };
    case "REMOVE_SUBSCRIBE": // 구취
      return {
        ...state,
        isSub: false, // 구독여부 false로
        count: state.count - 1, // 구독자수 -1
      };
    case "COUNT_SUBSCRIBE": // 구독자수
      return {
        ...state,
        count: action.payload, // 담아온 구독자수 return
      };
    case "GET_SUBSCRIBE": // 구독여부 확인
      return {
        ...state,
        isSub: true, // 구독중..?
        sub: action.payload, // 구독 정보 return
      };
    case "GET_SUBSCRIBE_ERROR": // 구독여부 확인에서 에러
      return {
        ...state,
        isSub: false,
        sub: null,
      };
    default:
      return state;
  }
};
