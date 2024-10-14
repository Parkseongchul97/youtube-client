import { FaBars, FaMagnifyingGlass } from "react-icons/fa6";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logo-dark.svg";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa6";

const StyledHeader = styled.header`
  position: fixed;
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 60px;
  z-index: 1;
  .header-start {
    display: flex;
    svg {
      font-size: 20px;
      margin: 20px;
    }
    a {
      padding: 20px 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .header-center {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    input {
      display: none;
    }
    button {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      border: 1px solid #bbb;
      border-left: none;
      padding: 10px 12px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      margin: 10px;
    }
    input {
      display: block;
      padding: 10px 20px;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border: 1px solid #ddd;
      width: 30%;
      max-width: 500px;
    }
    .header-end {
      display: flex;
      margin-right: 20px;
      button {
        background: none;
        border: none;
        font-size: 20px;
        margin: 10px;
      }
    }
  }

  @media screen and (min-width: 665px) {
    .header-center {
      justify-content: center;
    }
  }

  @media screen and (min-width: 880px) {
    main aside {
      display: block;
    }
    main .main-content {
      padding-left: 55px;
    }
  }

  @media screen and (min-width: 1000px) {
    .header-center input {
      width: 90%;
    }
  }
`;
const Header = ({ onUpload, onSearch }) => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [keyword, setKeyword] = useState("");

  const login = () => {
    // 로그인 페이지 이동
    navigate("/login");
  };

  const search = (e) => {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      onSearch(keyword);
    }
  };
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  return (
    <>
      <StyledHeader>
        <div className="header-start">
          <FaBars />
          <a href="/">
            <img src={theme === "light" ? logo : logoDark} />
          </a>
        </div>
        <div className="header-center">
          <input
            type="text"
            placeholder="검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={search}
          />
          <button type="button" onClick={() => onSearch(keyword)}>
            <FaMagnifyingGlass />
          </button>
        </div>
        <div className="header-end">
          {console.log(token)}
          {token === null ? (
            <button type="button" onClick={login}>
              로그인
            </button>
          ) : (
            <button type="button" onClick={logout}>
              로그아웃
            </button>
          )}
          <button type="button" onClick={open}>
            업로드
          </button>
          <button onClick={toggleTheme}>
            {theme === "dark" ? <IoSunnyOutline /> : <FaMoon />}
          </button>
        </div>
        <Modal isOpen={isOpen} onClose={close} onUpload={onUpload} />
      </StyledHeader>
    </>
  );
};
export default Header;
