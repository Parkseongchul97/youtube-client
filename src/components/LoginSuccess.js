import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LoginSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  useEffect(() => {
    // url에서 토큰 추출
    const url = new URLSearchParams(window.location.search);
    const token = url.get("token"); // 파라미터값
    alert(token);

    // 토큰 로컬스토리지에 저장
    login(token);
    // 메인페이지로 이동
    navigate("/");
  }, []);

  return null;
};
export default LoginSuccess;
