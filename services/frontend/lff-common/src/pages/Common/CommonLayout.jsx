import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <SideBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
