import { useState } from "react";
import Cookies from "js-cookie";

interface UseAuth {
  isLoggedIn: boolean;
  accessToken: string;
  login: (token: string) => void;
  logout: () => void;
}

const useAuth = (): UseAuth => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    Cookies.get("isLoggedIn") === "true"
  );
  const [accessToken, setAccessToken] = useState<string>(
    Cookies.get("accessToken") || ""
  );

  const login = (token: string) => {
    Cookies.set("isLoggedIn", "true", { expires: 7 }); // Set isLoggedIn cookie
    Cookies.set("accessToken", token, { expires: 7 }); // Set accessToken cookie
    setIsLoggedIn(true);
    setAccessToken(token);
  };

  const logout = () => {
    Cookies.remove("isLoggedIn"); // Remove isLoggedIn cookie
    Cookies.remove("accessToken"); // Remove accessToken cookie
    setIsLoggedIn(false);
    setAccessToken("");
  };

  return { isLoggedIn, accessToken, login, logout };
};

export default useAuth;
