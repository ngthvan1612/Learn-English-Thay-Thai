import style from "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import { sendDelete, sendGet, sendPost, sendPut } from "./axios";
import * as UserApi from "./api/admin/UserApi";

const Login = () => {
  const refUsernameInput = useRef(null);
  const refPasswordInput = useRef(null);

  function onLoginHandle(e) {
    const username = refUsernameInput.current.value;
    const password = refPasswordInput.current.value;
    e.preventDefault();
    UserApi.userLogin(username, password)
      .then((response) => {
        const USER_DATA = response.data;
        localStorage.setItem("USER_DATA", JSON.stringify(USER_DATA));
        const USER_ROLE = USER_DATA.data.role;
        if (USER_ROLE == "TEACHER") window.location.href = "/teacher";
        else if (USER_ROLE == "STUDENT") window.location.href = "/student";
        else if (USER_ROLE == "ADMIN") window.location.href = "/admin";
        else if (USER_ROLE == "STAFF") window.location.href = "/STAFF";
      })
      .catch((error) => {
        console.log(error);
        const messages = error.response.data.messages;
        for (const message of messages) {
          alert(message);
        }
      });
  }

  return (
    <>
      <div className="login-container align">
        <div className="grid">
          <label className="login-title">LOGIN</label>
          <form className="form login" onSubmit={onLoginHandle}>
            <div className="form__field">
              <label htmlFor="login__username">
                <svg className="icon">
                  <FontAwesomeIcon icon={faUser} />
                </svg>
                <span className="hidden">Username</span>
              </label>
              <input
                autoComplete="username"
                id="login__username"
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
                required
                // value={username}
                // onChange={(e) => {
                //   setUsername(e.target.value);
                // }}
                ref={refUsernameInput}
              />
            </div>

            <div className="form__field">
              <label htmlFor="login__password">
                <svg className="icon">
                  <FontAwesomeIcon icon={faKey} />
                </svg>
                <span className="hidden">Password</span>
              </label>
              <input
                id="login__password"
                type="password"
                name="password"
                className="form__input"
                placeholder="Password"
                required
                // value={password}
                // onChange={(e) => {
                //   setPassword(e.target.value);
                // }}
                ref={refPasswordInput}
              />
            </div>

            {/* <div className="form__field">
              <<div type="submit" value="Sign In" />>
            </div> */}
            <div className="form__field">
              {/* <input className="login-btn">Sign In</input> */}
              <input type="submit" value={"Đăng nhập"} />
            </div>
          </form>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" className="icons">
          <symbol id="icon-arrow-right" viewBox="0 0 1792 1792">
            <path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z" />
          </symbol>
          <symbol id="icon-lock" viewBox="0 0 1792 1792">
            <path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z" />
          </symbol>
          <symbol id="icon-user" viewBox="0 0 1792 1792">
            <path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z" />
          </symbol>
        </svg>
      </div>
    </>
  );
};
export default Login;
