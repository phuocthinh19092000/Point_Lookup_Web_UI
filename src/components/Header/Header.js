import react from "react";
import "../Header/Header.css";
import logo from "../../shared/assets/img/logo.jpg";
import logout from "../../shared/assets/img/logout.png";
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
const Header = (props) => {
  let history = useHistory();
  const handleLogOut = () => {
    localStorage.clear();
    history.push("/login");
  };
  return (
    <header className="header-section">
      <div className="logo-container">
        <img src={logo} alt="" />
        <div className="spacer"></div>
        <div className="title">
          <h3 className="project-name">{"Hệ thống tra cứu & Quản lý điểm"}</h3>
          <h4 className="project-team">{"PBL6 - Nhóm 5"}</h4>
        </div>
      </div>
      <div className="navbar">
        <div className="nav-group-items">
          {props.children}
          {/* <div className = "nav-item-header"><b>Cá nhân</b>
					<div className = "dropdown-content">
						<a href="#">Thông tin cá nhân</a>
						<a href="#">Điểm thi</a>
						
					</div>
				</div>
				<div className = "nav-item-header"><b>Yêu cầu</b>
					<div className = "dropdown-content">
						<a href="#">Yêu cầu nhà trường</a>
						<a href="#">Yêu cầu 2</a>
						<a href="#">Yêu cầu 3</a>
						
					</div>
				</div>
				<div className = "nav-item-header"><b>Khác</b>
					<div className = "dropdown-content">
						<a href="#">Dropdown 1</a>
						<a href="#">Dropdown 2</a>
						<a href="#">Dropdown 3</a>
					</div>
				</div> */}
        </div>
        <div className="nav-info">{props.isLoggedIn ? props.name : ""}</div>
        <div className="nav-login">
          <div className="login-btn" onClick={handleLogOut}>
            <b>{props.isLoggedIn ? "Đăng xuất" : "Đăng nhập"}</b>
            {props.isLoggedIn && (
              <img className="logout-icon" src={logout} alt={logout} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
