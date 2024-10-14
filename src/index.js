import React from "react";
import ReactDOM from "react-dom/client";
import router from "./router";
import { RouterProvider } from "react-router-dom";
import { AuthPorvider } from "./contexts/AuthContext";
import "./assets/reset.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./assets/dark.scss";
import { Provider } from "react-redux";
import store from "./store";

// Provider를 통해 리덕스 스토어 사용할 수 있도록 추가
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider>
      <AuthPorvider>
        <RouterProvider router={router} />
      </AuthPorvider>
    </ThemeProvider>
  </Provider>
);
