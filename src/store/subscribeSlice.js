import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subInsert, subRemove, countSub, getSub } from "../api/subscribe";

// createSlice로 리듀스 정리
export const subscribe = createAsyncThunk(
  "subscribe/subscribe", // 타입
  async (data) => {
    const response = await subInsert(data);
    return response.data; // 리턴 payload
  }
);
export const unsubscribe = createAsyncThunk(
  "subscribe/unsubscribe",
  async (subCode) => {
    const response = await subRemove(subCode);
    return response.data; // 보낼꺼가 없으면 안보내도댐
  }
);

export const subCount = createAsyncThunk(
  "subscribe/subCount",
  async (channelCode) => {
    const response = await countSub(channelCode);
    return response.data;
  }
);

export const subGet = createAsyncThunk(
  "subscribe/subGet",
  async (channelCode) => {
    const response = await getSub(channelCode);
    // if (response.data !== "")
    return response.data;
  }
);

const subscribeSlice = createSlice({
  name: "subscribe", // 슬라이스명
  initialState: {
    count: 0, // 구독자수
    isSub: false, // 구독 체크 여부
    sub: null, // 구독정보}, // 초기 상태,
  },
  reducers: {},
  extraReducers: (builder) => {
    // pending (대기상태) -> fulfilled(성공했을때) -> 뒤에 함수 (state, action)
    // 에러 rejected
    builder
      .addCase(subscribe.fulfilled, (state, action) => {
        state.sub = action.payload;
        state.isSub = true;
        state.count += 1;
      })
      .addCase(unsubscribe.fulfilled, (state) => {
        state.sub = null;
        state.isSub = false;
        state.count -= 1;
      })
      .addCase(subCount.fulfilled, (state, action) => {
        state.count = action.payload;
      })
      .addCase(subGet.fulfilled, (state, action) => {
        if (action.payload === "") {
          state.isSub = false;
          state.sub = null;
        } else {
          state.isSub = true;
          state.sub = action.payload;
        }
      })
      .addCase(subGet.rejected, (state) => {
        console.log("에러케이스");
        state.isSub = false;
        state.sub = null;
      });
  },
});
// 슬라이스 내보내기
export default subscribeSlice;
