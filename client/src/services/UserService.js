import Axios from "axios";
import { url } from "./Url";

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
  await Axios.post("http://localhost:5000/api/loginToAccount", {
    login: login,
    password: password,
  }).then((res) => {
    if (res.data.message) setLoginStatus(res.data.message);
    if (res.data.logged) navigate("/profil");
    else {
      setOpen(true);
    }
  });
};
