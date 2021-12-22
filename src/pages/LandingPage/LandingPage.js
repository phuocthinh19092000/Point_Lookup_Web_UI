import "./LandingPage.css";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import ValidateSelect from "../../components/ValidateSelect/ValidateSelect";
import ValidateInput from "../../components/ValidateInput/ValidateInput";
import Button from "../../components/Button/Button";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../shared/assets/img/school1.jpg";
import img2 from "../../shared/assets/img/school2.jpg";
import img3 from "../../shared/assets/img/school3.jpg";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
const LandingPage = () => {
  const [majors, setMajors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [searchModal, setSearchModal] = useState(false);
  const [allScores, setAllScores] = useState([]);
  useEffect(() => {
    axios
      .get("/api/findMajor")
      .then((response) => {
        setMajors(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleGetClasses = (e) => {
    axios
      .get("/api/findClassByMajor?majorCode=" + e.target.value)
      .then((response) => {
        setClasses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleSearch = () => {
    axios
      .get(
        "/api/findAllScoreByStudentCode?studentCode=" +
          document.querySelector("input[name='student-code']").value
      )
      .then((response) => {
        if (response.data.data) {
          setAllScores(response.data.data);
          setSearchModal(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Header name="" isLoggedIn={false}>
        <div className="nav-item-header">
          <b>Cá nhân</b>
          <div className="dropdown-content">
            <Link>Thông tin cá nhân</Link>
            <Link>Điểm thi</Link>
            <Link>Đổi mật khẩu</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Yêu cầu</b>
          <div className="dropdown-content"></div>
        </div>
        <div className="nav-item-header">
          <b>Khác</b>
          <div className="dropdown-content"></div>
        </div>
      </Header>
      <Carousel>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={img1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={img2} alt="Second slide" />
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img className="d-block w-100" src={img3} alt="Third slide" />
        </Carousel.Item>
      </Carousel>
      <h3
        style={{
          marginTop: "50px",
          textAlign: "center",
          textDecoration: "underline",
        }}
      >
        Tìm kiếm điểm
      </h3>
      <div className="search-container">
        <ValidateSelect name="major" lable="Ngành" onChange={handleGetClasses}>
          <option className="default-option" value="">
            -Chọn ngành-
          </option>
          {majors.map((item, index) => (
            <option key={index} value={item.majorCode}>
              {item.majorName}
            </option>
          ))}
        </ValidateSelect>
        <ValidateSelect name="class" lable="Lớp">
          <option className="default-option" value="">
            -Chọn lớp-
          </option>
          {classes &&
            classes.map((item, index) => (
              <option key={index} value={item.classCode}>
                {item.className}
              </option>
            ))}
        </ValidateSelect>
        <ValidateInput name="student-code" lable="Mã học sinh" />
        <Button title="Tìm" onClick={handleSearch} />
      </div>
      <div className="announcement">
        <h3 style={{ textDecoration: "underline" }}> Thông báo </h3>
      </div>
      <Modal
        show={searchModal}
        onHide={() => {
          setSearchModal(false);
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Tìm kiếm điểm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="detail-score-table" responsive bordered hover>
            <thead>
              <tr>
                <th>Môn học</th>
                <th>BT</th>
                <th>GK</th>
                <th>CK</th>
              </tr>
            </thead>
            <tbody>
              {allScores &&
                allScores.map((item, index) => (
                  <tr key={index}>
                    <td>{item.subjects.subjectName}</td>
                    <td>{item.assignmentScore}</td>
                    <td>{item.midtermScore}</td>
                    <td>{item.finalScore}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LandingPage;
