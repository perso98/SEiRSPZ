import Axios from "axios";
import { url } from "./Url";
import { useEffect } from "react";

Axios.defaults.withCredentials = true;
export const createAccount = async (
  login,
  password,
  password2,
  setRegisterStatus,
  setalertSeverity,
  setOpen
) => {
  await Axios.post(`${url}createAccount`, {
    login: login,
    password: password,
    password2: password2,
  }).then((res) => {
    if (res.data.message) {
      setRegisterStatus(res.data.message);
      if (res.data.register) setalertSeverity(false);
      else setalertSeverity(true);
      setOpen(true);
    }
  });
};

export const loginToAccount = async (
  login,
  password,
  setLoginStatus,
  setOpen,
  navigate
) => {
  await Axios.post(`${url}loginToAccount`, {
    login: login,
    password: password,
  }).then((res) => {
    if (res.data.message) setLoginStatus(res.data.message);
    if (res.data.logged) navigate("/home");
    else {
      setOpen(true);
    }
  });
};

export const getLoginToAccountInfo = (setLogged) => {
  Axios.get(`${url}loginToAccount`).then((res) => {
    setLogged(res.data.logged);
  });
};

export const logout = (navigate) => {
  Axios.post(`${url}logoutFromAccount`);
  navigate("/");
};
