import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import LoggedNav from "./LoggedNav";

export const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export const LoggedLayout = () => {
  return (
    <>
      <LoggedNav />
      <Outlet />
    </>
  );
};
