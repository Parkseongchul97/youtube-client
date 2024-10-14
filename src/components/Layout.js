import Header from "./Header";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { getVideo, getVideoDetail } from "../api/video";

/*
  최적화 : 서비스의 성능을 개선하는 기술 불필요하게 낭비되는 연산을 줄여 렌더링의 성능을 높이는 방법
    리액트에서는 최적화는 '메모이제이션(Memoization)' 기법을 이용한다.
  메모이제이션 : 말그대로 '메모하는 방법'(즐겨찾기 느낌?)

  useMemo(콜백함수, []) : 특정 함수를 호출했을 때 그 함수의 반환값을 기억해서 반환
    - 자주 쓰이는 곳 : 상태가 배열이나 객체일 때
  useCallback(콜백함수, []) : 리렌더링될 때 작성된 함수를 다시 생성하지 않도록 메모이제이션하는 훅
    - 자주 쓰이는 곳 : 함수
*/
const Layout = () => {
  // 호출 순서 때문에 일단 여기로 이동
  const [videos, setVideos] = useState([]);
  // 페이지 관리용
  const [page, setPage] = useState(1);
  // 데이터가 더있는지 확인용
  // const [more, setMore] = useState(true);
  const [keyword, setKeyword] = useState("");
  const memoVideos = useMemo(() => videos, [videos]);

  const [video, setVideo] = useState(null);

  const videoAPI = useCallback(async (page, keyword) => {
    const result = await getVideo(page, keyword);

    if (page === 1) {
      setVideos(result.data);
    } else {
      setVideos((prev) => [...prev, ...result.data]);
    }
  }, []);

  useEffect(() => {
    console.log("페이지 : " + page);
    videoAPI(page, keyword);
  }, [page, keyword, videoAPI]);
  // 비디오에서 검색기능
  const onSearch = (keyword) => {
    console.log("기능 : " + keyword);
    setPage(1); // 다시검색이니 1페이지로 복귀
    setVideos([]); // 비디오도 초기상태로
    setKeyword(keyword);
  };

  // 비디오가 추가되는 경우 -> useCallback 사용
  const onUpload = useCallback(() => {
    videoAPI(page);
  }, [videoAPI]);

  return (
    <>
      <Header onUpload={onUpload} onSearch={onSearch} />
      <Outlet context={{ videos: memoVideos, setPage }} />
    </>
  );
};
export default Layout;
