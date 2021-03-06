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
      })
      .catch((error) => console.log(error));
  };

  const handleOnClickAdd = (item) => {
    setAddModal(true);
    setSelectedSubject(item);
    axios
      .get("/api/listStudentOfSubject?subjectCode=" + item.subjectCode)
      .then((response) => {
        setListStudent(response.data.data || []);
      })
      .catch((error) => {
        console.log(error);
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
    axios
      .post("/api/addStudentInSubject?subjectCode=" + subjectCode, data)
      .then((response) => {
        if (response.data === "Th??m th??nh c??ng") {
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
            .then((response) => {})
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
          <b>C?? nh??n</b>
          <div className="dropdown-content">
            <Link to="/teacherprofile">Th??ng tin c?? nh??n</Link>
            <Link to="/changepassword">?????i m???t kh???u</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Qu???n l?? ??i???m</b>
          <div className="dropdown-content">
            <Link>Y??u c???u nh?? tr?????ng</Link>
            <Link to="/scoreteacher">Qu???n l?? ??i???m h???c sinh</Link>
            <Link>Qu???n l?? m??n h???c</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Kh??c</b>
        </div>
      </Header>
      <h2 className="score-page-title">Qu???n l?? m??n h???c</h2>

      <div className="search-container">
        <ValidateInput
          name="subject"
          lable="M??n h???c"
          dropdownList={allSubjects.reduce(
            (list, item) => list.concat(item.subjectName),
            []
          )}
        ></ValidateInput>
        <Button title="D??? li???u" onClick={handleSearchSubjects} />
      </div>
      <div className="detail-score">
        <h5>??i???m chi ti???t</h5>
        <Table className="detail-score-table" responsive bordered hover>
          <thead>
            <tr>
              <th>M?? m??n h???c</th>
              <th>T??n m??n h???c</th>
              <th>Danh s??ch sinh vi??n</th>
              <th>Th??m sinh vi??n</th>
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
                      Chi ti???t
                    </p>
                  </td>
                  <td>
                    <p
                      className="view-students"
                      onClick={() => handleOnClickAdd(item)}
                    >
                      Chi ti???t
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
                <th>M?? sinh vi??n</th>
                <th>T??n sinh vi??n</th>
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
              placeholder="Nh???p m?? sinh vi??n"
              lable="M?? sinh vi??n"
            />
            <ValidateInput placeholder="Nh???p l???p" lable="L???p" />
            {errorMessage && <p style={{ color: "red" }}>Th??m th???t b???i</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Th??m h???c sinh"
            onClick={() => handleAddStudent(selectedSubject.subjectCode)}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default SubjectTeacher;
