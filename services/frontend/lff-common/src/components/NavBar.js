import "./style.scss";
import mainLogo from "../assets/images/logo2.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <section className="navbar">
      <a className="navbar-left navbar-logo">
        <img src={mainLogo} alt="logo"></img>
      </a>
      <ul className="navbar-right navbar-list">
        <Link className="navbar-item">Giới thiệu</Link>
        <Link className="navbar-item">Tư vấn</Link>
        <Link className="navbar-item">Khóa học</Link>
        <Link className="navbar-item">Bài viết</Link>
        <a href='/login/' className="ff navbar-item">
          Đăng nhập
        </a>
      </ul>
    </section>
  );
};
export default NavBar;
