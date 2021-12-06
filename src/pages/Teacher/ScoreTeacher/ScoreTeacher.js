import "./ScoreTeacher.css";
import "../../Student/ScoreStudent/ScoreStudent.css";
import ValidateSelect from "../../../components/ValidateSelect/ValidateSelect";
import Button from "../../../components/Button/Button";
import Table from "react-bootstrap/Table";
// import Modal from "react-bootstrap/Modal";
import Header from "../../../components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ScoreTeacher = (props) => {
  const [subjects, setSubjects] = useState([]);
  const [currentSubjects, setCurrentSubjects] = useState();
  const [students, setStudents] = useState([]);
  // const [info, setInfo] = useState({});
  // const [lgShow, setLgShow] = useState(false);
  const allSubject = useRef([]);

  useEffect(() => {
    axios
      .get("/api/findAllSubject")
      .then((response) => {
        console.log(response.data.data);
        setSubjects(
          response.data.data.filter(
            (item) =>
              item.teacherCode ===
              JSON.parse(localStorage.getItem("user")).teacherCode
          )
        );
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    currentSubjects &&
      axios
        .get("/api/listStudentOfSubject?subjectCode=" + currentSubjects)
        .then((response) => {
          console.log(response.data.data);
          setStudents(response.data.data);
        })
        .catch((error) => console.log(error));
  }, [currentSubjects]);

  // const handleShowModal = (item) => {
  //   // const selectedRowInfo = e.target.closest("tr").querySelectorAll("td");
  //   setInfo((prev) => ({
  //     studentCode: item.person.studentCode,
  //     studentName: item.person.fullName,
  //     BT: item.scores[0] ? item.scores[0].assignmentScore : "",
  //     GK: item.scores[0] ? item.scores[0].midtermScore : "",
  //     CK: item.scores[0] ? item.scores[0].finalScore : "",
  //   }));
  //   setLgShow(true);
  // };

  // const handleAddScore = () => {
  //   const scores = document
  //     .querySelector(".modal-table")
  //     .querySelector(".edit-score-row")
  //     .querySelectorAll("td");
  //   const scoreData = {
  //     assignmentScore: +scores[0].innerText,
  //     finalScore: +scores[2].innerText,
  //     hardWorkScore: 0,
  //     midtermScore: +scores[1].innerText,
  //   };
  //   // console.log(scoreData)
  //   // console.log(info.studentCode)
  //   // console.log(currentSubjects)
  //   axios
  //     .post(
  //       `/api/addScore?studentCode=${info.studentCode}&subjectCode=${currentSubjects}`,
  //       scoreData
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //   setLgShow(false);
  // };

  const handleUpdateScore = () => {
    const allRows = document.querySelector("tbody").querySelectorAll("tr");
    // console.log(allRows);
    const allScores = [];
    allRows.forEach((item) => {
      // console.log(item.querySelectorAll("td"));
      const score = item.querySelectorAll("td");
      allScores.push({
        students: { studentCode: item.querySelector("th").innerText },
        subjects: { subjectCode: currentSubjects },
        assignmentScore: score[1].innerText ? +score[1].innerText : -1,
        midtermScore: score[2].innerText ? +score[2].innerText : -1,
        finalScore: score[3].innerText ? +score[3].innerText : -1,
      });
    });
    console.log(allScores);
    axios
      .put("/api/updateManyScore", allScores)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchSubject = () => {
    const searchInput = document.querySelector(".form-control").value;
    if (searchInput) {
      setCurrentSubjects(searchInput);
    } else {
      setCurrentSubjects("");
    }
    console.log(searchInput);
  };
  const averageNumScore = (exe, mid, fin) => {
    const ave = exe * 0.2 + mid * 0.3 + fin * 0.5;
    return Math.round(ave * 100) / 100;
  };
  const averageLetScore = (numScore) => {
    if (numScore >= 9) {
      return "A+";
    } else if (numScore >= 8.5) {
      return "A";
    } else if (numScore >= 8) {
      return "B+";
    } else if (numScore >= 7) {
      return "B";
    } else if (numScore >= 6.5) {
      return "C+";
    } else if (numScore >= 5.5) {
      return "C";
    } else if (numScore >= 5) {
      return "D+";
    } else if (numScore >= 4) {
      return "D";
    } else {
      return "F";
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
            <Link>Quản lí điểm học sinh</Link>
            <Link to="/subjectteacher">Quản lí môn học</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Khác</b>
          <div className="dropdown-content"></div>
        </div>
      </Header>
      <h2 className="score-page-title">Kết quả học tập</h2>
      {/* <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {info.studentName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            className="detail-score-table modal-table"
            responsive
            bordered
            hover
          >
            <thead>
              <tr>
                <th>Bài tập</th>
                <th>Giữa kì</th>
                <th>Cuối kì</th>
              
              </tr>
            </thead>
            <tbody>
              <tr className="edit-score-row">
                <td
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                >
                  {info.BT}
                </td>
                <td
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                >
                  {info.GK}
                </td>
                <td
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                >
                  {info.CK}
                </td>
           
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddScore} title="Save" />
        </Modal.Footer>
      </Modal> */}
      <div className="search-container">
        <ValidateSelect name="subject" lable="Môn học">
          <option className="default-option" value="">
            -Chọn môn-
          </option>
          {subjects.map((item, index) => (
            <option key={index} value={item.subjectCode}>
              {item.subjectCode} - {item.subjectName}
            </option>
          ))}
        </ValidateSelect>

        <Button title="Dữ liệu" onClick={handleSearchSubject} />
        <div className="horizotal-space" style={{ width: "50px" }}></div>

        <Button title="Lưu" onClick={handleUpdateScore} />
      </div>
      <div className="detail-score">
        <h5>Điểm chi tiết</h5>
        <Table className="detail-score-table" responsive bordered hover>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên sinh viên</th>
              <th>BT</th>
              <th>GK</th>
              <th>CK</th>
              <th colSpan="2">
                <Table responsive style={{ margin: "0px", padding: "0px" }}>
                  <thead>
                    <tr>
                      <th colSpan="2">Điểm trung bình</th>
                    </tr>
                    <tr>
                      <th style={{ width: "50%" }}>Thang 10</th>
                      <th style={{ width: "50%" }}>Chữ</th>
                    </tr>
                  </thead>
                </Table>
              </th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students
                .sort((a, b) =>
                  a.person.studentCode < b.person.studentCode ? -1 : 1
                )
                .map((item, index) => (
                  <tr key={index}>
                    {" "}
                    {/* onClick={() => handleShowModal(item)} */}
                    <th>{item.person.studentCode}</th>
                    <td>{item.person.fullName}</td>
                    <td
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                    >
                      {item.scores[0] &&
                        item.scores[0].assignmentScore >= 0 &&
                        item.scores[0].assignmentScore}
                    </td>
                    <td
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                    >
                      {item.scores[0] &&
                        item.scores[0].midtermScore >= 0 &&
                        item.scores[0].midtermScore}
                    </td>
                    <td
                      contentEditable={true}
                      suppressContentEditableWarning={true}
                    >
                      {item.scores[0] &&
                        item.scores[0].finalScore >= 0 &&
                        item.scores[0].finalScore}
                    </td>
                    <td>
                      {" "}
                      {item.scores[0] &&
                        item.scores[0].finalScore >= 0 &&
                        averageNumScore(
                          item.scores[0].assignmentScore,
                          item.scores[0].midtermScore,
                          item.scores[0].finalScore
                        )}
                    </td>
                    <td>
                      {item.scores[0] &&
                        item.scores[0].finalScore >= 0 &&
                        averageLetScore(
                          averageNumScore(
                            item.scores[0].assignmentScore,
                            item.scores[0].midtermScore,
                            item.scores[0].finalScore
                          )
                        )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ScoreTeacher;
