import { Link } from "react-router-dom";
import ProfileInput from "../../../components/ProfileInput/ProfileInput";
import Header from "../../../components/Header/Header";
import Profile from "../../../components/Profile/Profile";
import { useState, useEffect } from "react";
import axios from "axios";
const StudentProfile = () => {
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState(() => {
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    return localStorageUser || {};
  });
  const handleGetUser = (user) => {
    setUser(user);
    setFlag(true);
  };

  useEffect(() => {
    axios
      .get("/api/findStudentByCode?studentCode=" + user.studentCode)
      .then((response) => {
        // console.log(response.data.data.classCode);
        setUser({
          ...user,
          classCode: response.data.data.classCode,
        });
        axios
          .get(
            "/api/findMajorByClassCode?classCode=" +
              response.data.data.classCode
          )
          .then((response) => {
            setUser({
              ...user,
              majorName: response.data.data.majorName,
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [flag]);
  return (
    <>
      <Header isLoggedIn={true} name={user.fullName}>
        <div className="nav-item-header">
          <b>Cá nhân</b>
          <div className="dropdown-content">
            <Link>Thông tin cá nhân</Link>
            <Link to="/scorestudent">Điểm thi</Link>
            <Link to="/schedule">Lịch học, lịch thi</Link>
            <Link to="/changepassword">Đổi mật khẩu</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Yêu cầu</b>
          <div className="dropdown-content">
            <Link>Yêu cầu tài khoản</Link>
            <Link>Yêu cầu phúc khảo</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Khác</b>
          <div className="dropdown-content"></div>
        </div>
      </Header>
      <Profile getUser={handleGetUser}>
        <ProfileInput
          title="- Khoa -"
          inputClass="study-info-item"
          value={user.majorName}
          disabled={true}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <ProfileInput
          title="-  Lớp  - "
          inputClass="study-info-item"
          value={user.classCode}
          disabled={true}
        />
      </Profile>
    </>
  );
};

export default StudentProfile;
