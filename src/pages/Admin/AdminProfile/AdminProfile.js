import Profile from "../../../components/Profile/Profile";
import Header from "../../../components/Header/Header";
import ProfileInput from "../../../components/ProfileInput/ProfileInput";
import { Link } from "react-router-dom";
import { useState } from "react";
const AdminProfile = () => {
  const [user, setUser] = useState({});
  const handleGetUser = (user) => {
    setUser(user);
  };
  return (
    <>
      <Header isLoggedIn={true} name={user.fullName}>
        <div className="nav-item-header">
          <b>Cá nhân</b>
          <div className="dropdown-content">
            <Link>Thông tin cá nhân</Link>
            <Link to="/changepassword">Đổi mật khẩu</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Quản lí tài khoản</b>
          <div className="dropdown-content">
            <Link to="/manageteacheraccount">Tài khoản giáo viên</Link>
            <Link to="/managestudentaccount">Tài khoản học sinh</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Quản lí học tập</b>
          <div className="dropdown-content">
            <Link to="/managemajor">Quản lí lớp, khoa</Link>
            <Link to="/subjectadmin">Quản lí môn học</Link>
          </div>
        </div>
      </Header>
      <Profile title="Thông tin cá nhân" getUser={handleGetUser}>
        <ProfileInput title="-Chức vụ-" inputClass="study-info-item" />
        <ProfileInput title="-Ngành- " inputClass="study-info-item" />
      </Profile>
    </>
  );
};

export default AdminProfile;
