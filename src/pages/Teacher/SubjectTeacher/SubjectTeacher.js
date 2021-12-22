import "../../Student/ScoreStudent/ScoreStudent.css";
import "./SubjectTeacher.css";
import ValidateInput from "../../../components/ValidateInput/ValidateInput";
import Button from "../../../components/Button/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Header from "../../../components/Header/Header";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SubjectTeacher = (props) => {
  const [studentModal, setStudentModal] = useState();
  const [addModal, setAddModal] = useState();
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState({});
  const [errorMessage, setErrorMessage] = useState(false);
  const [listStudent, setListStudent] = useState([]);
  const allSubjectsRef = useRef([]);
  const [allSubjects, setAllSubjects] = useState([]);
  useEffect(() => {
    axios
      .get("/api/findAllSubject")
      .then((response) => {
        const allSubjects = response.data.data;
        allSubjectsRef.current = allSubjects;
        setSubjects(
          allSubjects.filter(
            (subject) =>
              subject.teacherCode ===
              JSON.parse(localStorage.getItem("user")).teacherCode
          )
        );
        setAllSubjects(
          allSubjects.filter(
            (subject) =>
              subject.teacherCode ===
              JSON.parse(localStorage.getItem("user")).teacherCode
          )
        );
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOnClickView = (item) => {
    setStudentModal(true);
    setSelectedSubject(item);
    axios
      .get("/api/listStudentOfSubject?subjectCode=" + item.subjectCode)
      .then((response) => {
        setListStudent(response.data.data || []);
      });
  };

  const handleOnClickAdd = (item) => {
    setAddModal(true);
    setSelectedSubject(item);
    axios
      .get("/api/listStudentOfSubject?subjectCode=" + item.subjectCode)
      .then((response) => {
        setListStudent(response.data.data || []);
      });
  };

  const handleAddStudent = (subjectCode) => {
    const addData = document
      .querySelector(".add-student")
      .querySelectorAll(".form-control");
    const data = {
      classCode: addData[1].value,
      studentCode: addData[0].value,
    };
    console.log(data);
    axios
      .post("/api/addStudentInSubject?subjectCode=" + subjectCode, data)
      .then((response) => {
        if (response.data === "Thêm thành công") {
          const defaultScore = {
            assignmentScore: -1,
            finalScore: -1,
            hardWorkScore: -1,
            midtermScore: -1,
          };
          axios
            .post(
              `/api/addScore?studentCode=${data.studentCode}&subjectCode=${subjectCode}`,
              defaultScore
            )
            .then((response) => {
            })
            .catch((err) => {
              console.log(err);
            });
          setAddModal(false);
          setErrorMessage(false);
        } else {
          setErrorMessage(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(true);
      });
  };

  const handleSearchSubjects = () => {
    const searchValue = document.querySelector("input[name='subject']").value;
    if (searchValue) {
      setSubjects(
        allSubjects.filter((item) => item.subjectName.includes(searchValue))
      );
    } else {
      setSubjects(allSubjects);
    }
  };

  return (
    <div className="score-teacher-page">
      <Header
        isLoggedIn={true}
        name={JSON.parse(localStorage.getItem("user")).fullName}
      >
        <div className="nav-item-header">
          <b>Cá nhân</b>
          <div className="dropdown-content">
            <Link to="/teacherprofile">Thông tin cá nhân</Link>
            <Link to="/changepassword">Đổi mật khẩu</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Quản lí điểm</b>
          <div className="dropdown-content">
            <Link>Yêu cầu nhà trường</Link>
            <Link to="/scoreteacher">Quản lí điểm học sinh</Link>
            <Link>Quản lí môn học</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Khác</b>
        </div>
      </Header>
      <h2 className="score-page-title">Quản lý môn học</h2>

      <div className="search-container">
        <ValidateInput
          name="subject"
          lable="Môn học"
          dropdownList={allSubjects.reduce(
            (list, item) => list.concat(item.subjectName),
            []
          )}
        ></ValidateInput>
        <Button title="Dữ liệu" onClick={handleSearchSubjects} />
      </div>
      <div className="detail-score">
        <h5>Điểm chi tiết</h5>
        <Table className="detail-score-table" responsive bordered hover>
          <thead>
            <tr>
              <th>Mã môn học</th>
              <th>Tên môn học</th>
              <th>Danh sách sinh viên</th>
              <th>Thêm sinh viên</th>
            </tr>
          </thead>
          <tbody>
            {subjects
              .sort((a, b) => (a.subjectCode < b.subjectCode ? -1 : 1))
              .map((item, index) => (
                <tr key={index}>
                  <th>{item.subjectCode}</th>
                  <td>{item.subjectName}</td>
                  <td>
                    <p
                      className="view-students"
                      onClick={() => handleOnClickView(item)}
                    >
                      Chi tiết
                    </p>
                  </td>
                  <td>
                    <p
                      className="view-students"
                      onClick={() => handleOnClickAdd(item)}
                    >
                      Chi tiết
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Modal
        show={studentModal}
        onHide={() => {
          setStudentModal(false);
          setListStudent([]);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedSubject.subjectCode} - {selectedSubject.subjectName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="detail-score-table" responsive bordered hover>
            <thead>
              <tr>
                <th>Mã sinh viên</th>
                <th>Tên sinh viên</th>
              </tr>
            </thead>
            <tbody>
              {listStudent
                .sort((a, b) => (a.studentCode < b.studentCode ? -1 : 1))
                .map((item, index) => (
                  <tr key={index}>
                    <th>{item.studentCode}</th>
                    <th>{item.person.fullName}</th>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <Modal
        show={addModal}
        onHide={() => {
          setAddModal(false);
          setListStudent([]);
          setErrorMessage(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedSubject.subjectCode} - {selectedSubject.subjectName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-student">
            <ValidateInput
              placeholder="Nhập mã sinh viên"
              lable="Mã sinh viên"
            />
            <ValidateInput placeholder="Nhập lớp" lable="Lớp" />
            {errorMessage && <p style={{ color: "red" }}>Thêm thất bại</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Thêm học sinh"
            onClick={() => handleAddStudent(selectedSubject.subjectCode)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SubjectTeacher;
