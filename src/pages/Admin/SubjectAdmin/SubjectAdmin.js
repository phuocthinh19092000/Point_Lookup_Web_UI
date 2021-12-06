import Table from "react-bootstrap/Table";
import ValidateInput from "../../../components/ValidateInput/ValidateInput";
import Button from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const SubjectAdmin = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [subject, setSubject] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const allSubjects = useRef([]);

  useEffect(() => {
    axios
      .get("/api/findAllSubject")
      .then((response) => {
        console.log(response.data);
        setSubject(response.data.data);
        allSubjects.current = response.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [modalAdd]);

  const handleAddSubject = () => {
    const addSubject = document.querySelectorAll(".add-subject-data");
    const data = {
      subjectCode: addSubject[0].innerText,
      subjectName: addSubject[1].innerText,
      teacherCode: addSubject[2].innerText,
    };
    // console.log(data);
    axios
      .post("/api/addSubject", data)
      .then((response) => {
        console.log(response.data);
        setModalAdd(false);
        setErrorMessage("");
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage("Thêm môn học thất bại");
      });
  };

  const handleSearchSubjects = () => {
    const searchInput = document.querySelector(".form-control").value;
    console.log(searchInput);
    if (searchInput) {
      setSubject((pre) =>
        pre.filter((item) =>
          item.subjectName
            .toLowerCase()
            .includes(searchInput.split("-")[1].trim().toLowerCase())
        )
      );
    } else {
      setSubject(allSubjects.current);
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
            <Link to="/managestudentaccount">Tài khoản học sinh</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Quản lí học tập</b>
          <div className="dropdown-content">
            <Link to="/managemajor">Quản lí lớp, khoa</Link>
            <Link>Quản lí môn học</Link>
          </div>
        </div>
      </Header>
      <div className="manage-account-page" style={{ marginTop: "20px" }}>
        <h2 style={{ margin: " 10px 20px", borderBottom: "solid 1px #111" }}>
          Quản lý môn học
        </h2>
        <div className="search-container" style={{ marginLeft: "40px" }}>
          <ValidateInput
            name="class-search"
            lable="Tên Môn Học"
            dropdownList={subject.reduce(
              (value, item) =>
                value.concat(`${item.subjectCode} - ${item.subjectName}`),
              []
            )}
          />
          <Button title="Dữ liệu" onClick={handleSearchSubjects} />
        </div>
        <div className="manage-account">
          <h5>Quản lý môn học</h5>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên môn học</th>
                <th>Mã giáo viên</th>
              </tr>
            </thead>
            <tbody>
              {subject
                .sort((a, b) => (a.subjectCode < b.subjectCode ? -1 : 1))
                .map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.subjectName}</td>
                    <td>{subject.teacherCode}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="add-major">
            <Button
              title="Thêm môn học"
              onClick={() => {
                setModalAdd(true);
              }}
            />
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={modalAdd}
        onHide={() => {
          setModalAdd(false);
          setErrorMessage("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Thêm môn học
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: "large" }}>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Mã</th>
                <th>Tên môn học</th>
                <th>Mã giáo viên</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th contentEditable={true} className="add-subject-data"></th>
                <th contentEditable={true} className="add-subject-data"></th>
                <th contentEditable={true} className="add-subject-data"></th>
              </tr>
            </tbody>
          </Table>
          <p style={{ color: "red" }}>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button title="Xác nhận" onClick={handleAddSubject} />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default SubjectAdmin;
