import Input from "../../components/Input";
import { signup } from "../../api/member";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [member, setMember] = useState({
    id: "",
    password: "",
    email: "",
    phone: "",
  });
  const [passwordCheck, setpasswordCheck] = useState("");
  const navigate = useNavigate();
  const submit = async () => {
    // 회원가입 로직
    console.log(member);
    const result = await signup(member);
    if (result.status === 200) {
      navigate("/login");
    } else {
      navigate("/");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">회원가입</h1>
        <Input
          label={"아이디"}
          placeholder={"아이디를 입력해주세요."}
          type={"text"}
          value={member.id}
          change={(e) => setMember({ ...member, id: e.target.value })}
        />

        <Input
          label={"비밀번호"}
          placeholder={"비밀번호를 입력해주세요."}
          type={"password"}
          value={member.password}
          change={(e) => setMember({ ...member, password: e.target.value })}
        />

        <Input
          label={"비밀번호 확인"}
          placeholder={"비밀번호를 다시 입력해주세요."}
          type={"password"}
          value={passwordCheck}
          change={(e) => setpasswordCheck(e.target.value)}
        />

        <Input
          label={"이메일"}
          placeholder={"이메일을 입력해주세요."}
          type={"email"}
          value={member.email}
          change={(e) => setMember({ ...member, email: e.target.value })}
        />

        <Input
          label={"전화번호"}
          placeholder={"전화번호를 입력해주세요."}
          type={"tel"}
          value={member.phone}
          change={(e) => setMember({ ...member, phone: e.target.value })}
        />

        <div>
          <button
            type="button"
            className="bg-black text-white w-full py-3 font-bold rounded hover:bg-red-600"
            onClick={submit}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
