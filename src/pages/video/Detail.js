import { useEffect, useReducer, useState } from "react";
import "../../assets/detail.css";
import {
  videoReducer,
  initState as videoState,
  fetchVideo,
  fetchVideos,
} from "../../reducers/videoReducer";

import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribe,
  unsubscribe,
  subGet,
  subCount,
} from "../../store/subscribeSlice";
import { add as createComment, comments } from "../../store/commentSlice";
import CommentCom from "../../components/CommentCom";
const Detail = () => {
  const { videoCode } = useParams();
  const { token, id } = useAuth();
  // 리듀서방식 -
  const [state, videoDispatch] = useReducer(videoReducer, videoState);

  const [isComment, setIsComment] = useState(false);

  const { video, videos } = state; // 구조분해 할당
  const [newComment, setNewComment] = useState({
    commentText: "",
    videoCode: videoCode,
    id: id,
  });

  // 리덕스 툴킷 방식 - 구독
  const dispatch = useDispatch();
  const isSub = useSelector((state) => state.subscribe.isSub);
  const count = useSelector((state) => state.subscribe.count);
  const sub = useSelector((state) => state.subscribe.sub);
  const commentList = useSelector((state) => state.comment.commentList);

  const handleSub = () => {
    if (isSub) {
      // 구독 취소 상황
      console.log(sub);
      dispatch(unsubscribe(sub?.subCode));
    } else {
      // 구독 상황
      dispatch(subscribe({ channelCode: video?.channel.channelCode }));
    }
  };

  const addComment = () => {
    console.log("댓글 전송");
    dispatch(createComment(newComment));
    setIsComment(false);
    setNewComment({ ...newComment, commnetText: "" });
  };

  useEffect(() => {
    fetchVideo(videoDispatch, videoCode);
    fetchVideos(videoDispatch, 1, "");

    dispatch(comments(videoCode));
  }, []);

  useEffect(() => {
    if (video != null) {
      console.log(video);
      dispatch(subCount(video?.channel.channelCode));
      if (token != null) {
        dispatch(subGet(video?.channel.channelCode));
      }
    }
  }, [video, token]);
  // 시점이 다를때마다 useEffect 추가

  return (
    <main className="detail">
      <div className="video-detail">
        <video controls src={video?.videoUrl}></video>
        <h2>{video?.videoTitle}</h2>
        <div className="video-detail-desc">
          <div className="detail-desc-left">
            <img src={video?.channel?.channelImg} />
            <div className="channel-desc">
              <h3>{video?.channel?.channelName}</h3>
              <p>구독자{count} 명</p>
            </div>
            {isSub ? (
              <button onClick={handleSub}>구독취소</button>
            ) : (
              <button onClick={handleSub}>구독</button>
            )}
          </div>
        </div>
        <div className="video-detail-info">{video?.videoDesc}</div>
        <div className="comment">
          <input
            className="comment-add"
            type="text"
            placeholder="댓글 추가.."
            value={newComment.commentText}
            onClick={() => setIsComment(true)}
            onChange={(e) => {
              setNewComment({ ...newComment, commentText: e.target.value });
            }}
          />
          {isComment && (
            <div className="comment-add-status">
              <button
                className="comment-submit"
                onClick={() => setIsComment(false)}
              >
                취소
              </button>
              <button className="comment-submit" onClick={addComment}>
                댓글 등록
              </button>
            </div>
          )}
          <div className="comment-list">
            {commentList.length === 0 ? (
              <p>댓글이 없습니당</p>
            ) : (
              commentList.map((com) => (
                <CommentCom
                  com={com}
                  videoCode={videoCode}
                  key={com.commentCode}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="video-list">
        {videos?.map((video) => (
          <a
            href={`/video/${video.videoCode}`}
            className="video-list-card"
            key={video.videoCode}
          >
            <img src={video.videoImg} />
            <div className="video-list-desc">
              <h4>{video.videoTitle}</h4>
              <p>{video.channel.channelName}</p>
              <p className="video-meta">조회수 {video.videoCount}회</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
};
export default Detail;
