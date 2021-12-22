import "./ManageStudentAccount.css";
import "../ManageTeacherAccount/ManageTeacherAccount.css";
import Table from "react-bootstrap/Table";
import ValidateInput from "../../../components/ValidateInput/ValidateInput";
import Button from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ManageStudentAccount = () => {
  const [listStudent, setListStudent] = useState([]);
  const allStudents = useRef([]);
  useEffect(() => {
    axios
      .get("/api/listPerson?roleCode=STUDENT")
      .then((response) => {
        setListStudent(response.data.data);
        allStudents.current = response.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = () => {
    const searchInput = document.querySelector("#student-code").value;
    if (searchInput.trim()) {
      setListStudent(
        allStudents.current.filter((item) => item.studentCode === searchInput)
      );
    } else {
      setListStudent(allStudents.current);
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
            <Link to="/changepassword">Đổi mật khẩu</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Quản lí tài khoản</b>
          <div className="dropdown-content">
            <Link to="/manageteacheraccount">Tài khoản giáo viên</Link>
            <Link>Tài khoản học sinh</Link>
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
          Trang quản lí tài khoản học sinh
        </h2>
        <div className="search-container">
          {/* <ValidateSelect
            name="major"
            lable="Ngành"
            onChange={handleGetClasses}
          >
            <option className="default-option" value="">
              -Chọn ngành-
            </option>
            {majors &&
              majors.map((item, index) => (
                <option key={index} value={item.majorCode}>
                  {item.majorName}
                </option>
              ))}
          </ValidateSelect>
          <ValidateSelect
            name="class"
            lable="Lớp"
            onChange={(e) => {
              setSelectedClass(e.target.value);
            }}
          >
            <option className="default-option" value="">
              -Chọn lớp-
            </option>
            {classes &&
              classes.map((item, index) => (
                <option key={index} value={item.classCode}>
                  {item.className}
                </option>
              ))}
          </ValidateSelect> */}
          <ValidateInput id="student-code" lable="Mã học sinh" />
          <Button title="Dữ liệu" onClick={handleSearch} />
        </div>
        <div className="manage-account">
          <h5>Quản lý tài khoản Học sinh</h5>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Mã học sinh</th>
                <th>Tên học sinh</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {Boolean(listStudent.length) &&
                listStudent
                  .sort((a, b) => (a.studentCode < b.studentCode ? -1 : 1))
                  .map((item, index) => (
                    <tr key={index}>
                      <th>{item.studentCode}</th>
                      <td>{item.fullName}</td>
                      <td>{item.userName}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.status ? "Đang hoạt động" : "Dừng hoạt động"}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default ManageStudentAccount;
