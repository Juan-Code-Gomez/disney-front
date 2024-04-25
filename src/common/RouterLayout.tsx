import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function RouterLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default RouterLayout;
