import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

function Layout() {
  return (
    <>
      <header />
      <Outlet />
    </>
  );
}

export default Layout;
