import "./ManageTeacherAccount.css";
import Table from "react-bootstrap/Table";
import ValidateSelect from "../../../components/ValidateSelect/ValidateSelect";
import ValidateInput from "../../../components/ValidateInput/ValidateInput";
import Button from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ManageTeacherAccount = () => {
  const [listTeacher, setListTeacher] = useState([]);

  useEffect(() => {
    axios
      .get("/api/listPerson?roleCode=TEACHER")
      .then((response) => {
        console.log(response.data.data);
        setListTeacher(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Header name="admin Thịnh" isLoggedIn={true}>
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
          <ValidateSelect name="major" lable="Ngành">
            <option className="default-option" value="">
              -Chọn ngành-
            </option>
            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
            <option value="Công nghệ sinh học">Công nghệ sinh học</option>
            <option value="Kiến trúc">Kiến trúc</option>
            <option value="Nhiệt điện">Nhiệt điện</option>
          </ValidateSelect>
          <ValidateInput
            name="teacher-name"
            lable="Tên"
            dropdownList={["a", "aa", "aaa"]}
          />
          <Button title="Dữ liệu" />
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
