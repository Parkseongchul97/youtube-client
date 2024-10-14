import "../assets/style.css";
import { FaHouse, FaFolder } from "react-icons/fa6";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Main = () => {
  const { videos, setPage } = useOutletContext();
  const navigate = useNavigate();
  // IntersectionObserver 감지하는거

  const scroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setPage((page) => page + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [setPage]);
  const detail = (videoCode) => {
    navigate(`/video/${videoCode}`);
  };
  return (
    <main>
      <aside>
        <a href="">
          {" "}
          <FaHouse />
          <span>홈</span>
        </a>{" "}
        <a href="">
          {" "}
          <FaFolder />
          <span>구독</span>
        </a>
      </aside>
      <div className="main-content">
        <nav>
          <a href="" className="active">
            전체
          </a>{" "}
          <a href="">음악</a>
          <a href="">게임</a>
          <a href="">뉴스</a>
          <a href="">라이브</a>
          <a href="">야생생물</a>
        </nav>
        <section>
          {videos.map((video) => (
            <div
              className="video-card"
              key={video.videoCode}
              data-code={video.videoCode}
            >
              <div className="video-main">
                <img src={video.videoImg} />
                <video src={video.videoUrl} controls></video>
              </div>
              <div
                className="video-info"
                onClick={() => detail(video.videoCode)}
              >
                <img src={video.channel.channelImg} />
                <div className="video-desc">
                  <h2>{video.videoTitle}</h2>
                  <p>{video.channel.channelName}</p>
                  <p className="video-meta" data-video-date={video.videoDate}>
                    조회수 {video.videoCount}회ㆍ
                    <span className="video-date"></span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};
export default Main;
