import "./ManageTeacherAccount.css";
import Table from "react-bootstrap/Table";
import ValidateInput from "../../../components/ValidateInput/ValidateInput";
import Button from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ManageTeacherAccount = () => {
  const [listTeacher, setListTeacher] = useState([]);
  const allTeachers = useRef([]);
  useEffect(() => {
    axios
      .get("/api/listPerson?roleCode=TEACHER")
      .then((response) => {
        setListTeacher(response.data.data);
        allTeachers.current = response.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSearchTeacher = () => {
    const searchInput = document.querySelector(".form-control").value;
    if (searchInput) {
      setListTeacher((pre) =>
        pre.filter((item) => item.fullName.includes(searchInput))
      );
    } else {
      setListTeacher(allTeachers.current);
    }
  };
  return (
    <>
      <Header
        isLoggedIn={true}
        name={JSON.parse(localStorage.getItem("user")).fullName}
      >
        <div className="nav-item-header">
          <b>Cá nhân</b>
          <div className="dropdown-content">
            <Link to="/adminprofile">Thông tin cá nhân</Link>
            <Link to="/profile">Đổi mật khẩu</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Quản lí tài khoản</b>
          <div className="dropdown-content">
            <Link>Tài khoản giáo viên</Link>
            <Link to="/managestudentaccount">Tài khoản học sinh</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Quản lí học tập</b>
          <div className="dropdown-content">
            <Link to="/managemajor">Quản lí lớp, khoa</Link>
            <Link to="subjectadmin"> Quản lí môn học</Link>
          </div>
        </div>
      </Header>

      <div className="manage-account-page" style={{ marginTop: "20px" }}>
        <h2 style={{ margin: " 10px 20px", borderBottom: "solid 1px #111" }}>
          Trang quản lí tài khoản giáo viên
        </h2>
        <div className="search-container">
          <ValidateInput
            name="teacher-name"
            className="search-teacher"
            lable="Tên"
            dropdownList={
              listTeacher &&
              listTeacher.reduce(
                (value, item) => value.concat(item.fullName),
                []
              )
            }
          />
          <Button title="Dữ liệu" onClick={handleSearchTeacher} />
        </div>
        <div className="manage-account">
          <h5>Quản lý tài khoản giáo viên</h5>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Mã giáo viên</th>
                <th>Tên giáo viên</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {listTeacher
                .sort((a, b) => (a.teacehrCode < b.teacherCode ? -1 : 1))
                .map((item, index) => (
                  <tr key={index}>
                    <th>{item.teacherCode}</th>
                    <td>{item.fullName}</td>
                    <td>{item.userName}</td>
                    <td>{item.email}</td>
                    <td>{item.status ? "Đang hoạt động" : "Dừng hoạt động"}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ManageTeacherAccount;
