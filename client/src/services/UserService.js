import Axios from "axios";
import { url } from "./Url";

Axios.defaults.withCredentials = true;
export const createAccount = async (
  registerLogin,
  registerPassword,
  registerPassword2,
  setRegisterStatus,
  setalertSeverity,
  setOpen
) => {
  await Axios.post(`${url}createAccount`, {
    registerLogin: registerLogin,
    registerPassword: registerPassword,
    registerPassword2: registerPassword2,
  }).then((res) => {
    if (res.data.message) {
      setRegisterStatus(res.data.message);
      if (res.data.message == "Konto zostało pomyślnie utworzone")
        setalertSeverity(false);
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
