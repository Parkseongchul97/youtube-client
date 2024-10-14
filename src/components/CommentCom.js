import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useDispatch } from "react-redux";
import {
  add as createComment,
  update as updateCom,
  deleteCom,
} from "../store/commentSlice";
const CommentCom = ({ com, videoCode }) => {
  const dispatch = useDispatch();
  const { id } = useAuth();
  const [newReply, setNewReply] = useState({
    commentText: "",
    videoCode: videoCode,
    id: id,
    parentCode: 0,
  });
  const [changeComment, setChangeComment] = useState({
    commentCode: 0,
    commentText: "",
    videoCode: videoCode,
    id: id,
    parentCode: 0,
  });

  const [isChange, setIsChange] = useState(0);

  const addReply = () => {
    console.log("대댓글 로직");
    dispatch(createComment(newReply));
    setNewReply({
      ...newReply,
      commentText: "",
      parentCode: 0,
    });
  };
  const deleteComment = (c) => {
    const data = {
      videoCode: videoCode,
      commentCode: c,
    };
    // 비디오코드랑 코맨트코드
    dispatch(deleteCom(data));
  };
  const updateComment = () => {
    dispatch(updateCom(changeComment));
    setChangeComment({
      commentText: "",
      videoCode: videoCode,
      id: id,
      parentCode: 0,
    });
    console.log(changeComment);
    setIsChange(0);
  };
  const edit = (commentId, commentText, commentCode) => {
    // 댓글단 사람과 로그인 사람이 같으면
    if (id === commentId) {
      setChangeComment({
        ...changeComment,
        commentCode: commentCode,
        commentText: commentText,
        parentCode: com.parentCode,
      });
    }
  };
  return (
    <div className="comment-content">
      {com.delete ? (
        <p>삭제된 댓글입니다...</p>
      ) : (
        <>
          {" "}
          <h4>{com.id}</h4>
          {isChange === com.commentCode ? (
            <>
              <div className="edit-content">
                <input
                  type="text"
                  value={changeComment.commentText}
                  onChange={(e) =>
                    setChangeComment({
                      ...changeComment,
                      commentText: e.target.value,
                      commentCode: com.commentCode,
                    })
                  }
                />
                <button onClick={() => setIsChange(0)}>취소</button>
                <button onClick={updateComment}>수정</button>
              </div>
            </>
          ) : (
            <p onClick={() => edit(com.id, com.commentText, com.commentCode)}>
              {com.commentText}
            </p>
          )}
          {com.id === id && (
            <>
              <button
                onClick={() => {
                  // 수정버튼 누를시 해당 코맨트 코드를 is체인지에 세팅
                  setIsChange(com.commentCode);
                  // 버튼누르면 수정 폼에 이전 벨류 추가
                  setChangeComment({
                    ...changeComment,
                    commentCode: com.commentCode,
                    commentText: com.commentText,
                    parentCode: com.parentCode,
                  });
                }}
              >
                수정하기
              </button>
              {isChange === com.commentCode && (
                <>
                  <div className="edit-content">
                    <input
                      type="text"
                      placeholder="답글 수정.."
                      value={changeComment.commentText}
                      onChange={(e) =>
                        setChangeComment({
                          ...changeComment,
                          commentText: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button onClick={updateComment}>수정</button>
                  <button onClick={() => setIsChange(0)}>취소</button>
                </>
              )}
              <button onClick={() => deleteComment(com.commentCode)}>
                삭제
              </button>
            </>
          )}
        </>
      )}
      <button
        onClick={() =>
          setNewReply({ ...newReply, parentCode: com.commentCode })
        }
      >
        답글
      </button>
      {newReply.parentCode === com.commentCode && (
        <>
          <input
            type="text"
            placeholder="답글 추가.."
            value={newReply.commentText}
            onChange={(e) =>
              setNewReply({
                ...newReply,
                commentText: e.target.value,
                parentCode: com.commentCode,
              })
            }
          />
          <div className="reply-add-status">
            <button
              onClick={() =>
                setNewReply({
                  ...newReply,
                  commentText: "",
                  parentCode: 0,
                })
              }
            >
              취소
            </button>
            <button onClick={addReply}>답글</button>
          </div>
        </>
      )}
      {com.reComment?.map((rc) => (
        <CommentCom com={rc} videoCode={videoCode} key={rc.commentCode} />
      ))}
    </div>
  );
};
export default CommentCom;
