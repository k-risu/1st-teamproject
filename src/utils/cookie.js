import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = () => {
  return cookies.get("signedUserNo");
};

export const setCookie = (value, options) => {
  return cookies.set("signedUserNo", value, { ...options });
};

export const removeCookie = (options) => {
  return cookies.remove("signedUserNo", { ...options });
};
