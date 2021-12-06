import { Link } from "react-router-dom";
import ProfileInput from "../../../components/ProfileInput/ProfileInput";
import Header from "../../../components/Header/Header";
import Profile from "../../../components/Profile/Profile";
import { useState } from "react";
const TeacherProfile = () => {
  const [user, setUser] = useState({})
  const handleGetUser = (user) =>{
    setUser(user)
  }
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
          <b>Quản lí điểm</b>
          <div className="dropdown-content">
            <Link>Yêu cầu nhà trường</Link>
            <Link to = "/scoreteacher">Quản lí điểm học sinh</Link>
            <Link to = "/subjectteacher">Quản lí môn học</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Khác</b>
        </div>
      </Header>
      <Profile title = "Thông tin giáo viên " getUser = {handleGetUser}>
        <ProfileInput title="- Khoa -" inputClass="study-info-item" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <ProfileInput title="-Chức vụ- " inputClass="study-info-item" />
      </Profile>
    </>
  );
};

export default TeacherProfile;
