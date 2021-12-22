import "../ManageMajor/ManageMajor.css";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import ValidateInput from "../../../components/ValidateInput/ValidateInput";
import Button from "../../../components/Button/Button";
import Header from "../../../components/Header/Header";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const ManageClass = () => {
  const [modalAdd, setModalAdd] = useState(false);
  const [updClass, setUpdClass] = useState({});
  const [modalUpdate, setModalUpdate] = useState(false);
  const [fileValue, setFileValue] = useState();
  const [teacher, setTeacher] = useState("");
  const [errorUpdate, setErrorUpdate] = useState("");
  const [studentsModal, setStudentsModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [allClasses, setAllClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const [students, setStudents] = useState([]);
  const location = useLocation();
  const allClassesRef = useRef([]);

  useEffect(() => {
    axios
      .get("/api/findClassByMajor?majorCode=" + location.state.params.majorCode)
      .then((response) => {
        setClasses(response.data.data);
        setAllClasses(response.data.data);
        allClassesRef.current = response.data.data;
      })
      .catch((error) => {
        console.log(error, "myError");
      });
  }, [modalAdd, modalUpdate]);
  const handleAddClass = () => {
    const addClassData = document.querySelectorAll(".add-class-data");
    const data = {
      classCode: addClassData[0].innerText,
      className: addClassData[1].innerText,
    };
    axios
      .post(
        `/api/addClass?majorName=${location.state.params.majorName}&userNameTeacher=${teacher}`,
        data
      )
      .then((reponse) => {
        setModalAdd(false);
        setErrorUpdate("");
      })
      .catch((err) => {
        console.log(err);
        setErrorUpdate("Thêm lớp thất bại");
      });
  };
  const handleAddStudents = () => {
    const addStudentData = document.querySelector(".add-student-data");
    if (fileValue) {
      const formData = new FormData();
      formData.append("file", fileValue);
      axios
        .post(
          `/api/uploadStudentInClass?classCode=${selectedClass.classCode}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((response) => {
          setErrorUpdate("");
          handleViewStudents(selectedClass);
        })
        .catch((error) => {
          console.log(error);
          setErrorUpdate("Thêm thất bại");
        });
    } else {
      axios
        .post(
          `/api/addStudentInClass?classCode=${selectedClass.classCode}&studentCode=${addStudentData.innerText}`
        )
        .then((response) => {
          setErrorUpdate("");
          addStudentData.innerText = "";
          handleViewStudents(selectedClass);
        })
        .catch((error) => {
          console.log(error);
          setErrorUpdate("Thêm học sinh thất bại");
        });
    }
  };
  const handleSearchMajor = () => {
    const searchInput = document.querySelector(".form-control").value;
    if (searchInput) {
      setClasses(
        allClassesRef.current.filter((item) =>
          item.className.includes(searchInput)
        )
      );
    } else {
      setClasses(allClassesRef.current);
    }
  };
  const handleViewStudents = (item) => {
    setStudentsModal(true);
    setSelectedClass(item);
    axios
      .get("/api/findStudentByClassCode?classCode=" + item.classCode)
      .then((response) => {
        setStudents(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdataClass = (updateClass) => {
    const className = document.querySelector(".update-class-data").innerText;
    if (!className.trim()) {
      setErrorUpdate("Không để trống tên lớp");
      // setModalUpdate(false)
    } else if (className === updateClass.className) {
      setModalUpdate(false);
    } else {
      const data = {
        code: updateClass.classCode,
        name: className,
      };
      axios
        .put(
          `/api/updateClassName?classCode=${data.code}&className=${data.name}`
        )
        .then((response) => {
          setModalUpdate(false);
          setErrorUpdate("");
        })
        .catch((err) => {
          console.log("Lỗi: ", err);
          setErrorUpdate("cập nhật thất bại");
        });
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
            <Link to="managemajor">Quản lí lớp, khoa</Link>
            <Link to="/subjectadmin">Quản lí môn học</Link>
          </div>
        </div>
      </Header>
      <div className="manage-account-page" style={{ marginTop: "20px" }}>
        <h2 style={{ margin: " 10px 20px", borderBottom: "solid 1px #111" }}>
          {location.state.params.majorName}
        </h2>
        <div className="search-container" style={{ marginLeft: "40px" }}>
          <ValidateInput
            name="class-search"
            lable="Tên Lớp"
            dropdownList={
              Boolean(allClasses?.length) &&
              allClasses.reduce(
                (value, item) => value.concat(item.className),
                []
              )
            }
          />
          <Button title="Dữ liệu" onClick={handleSearchMajor} />
        </div>
        <div className="manage-account">
          <h5>Quản lý lớp</h5>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Mã Lớp</th>
                <th>Tên lớp</th>
                <th>Chi tiết</th>
                <th>Sửa</th>
              </tr>
            </thead>
            <tbody>
              {classes &&
                classes
                  .sort((a, b) => (a.classCode < b.classCode ? -1 : 1))
                  .map((item, index) => (
                    <tr key={index}>
                      <th>{item.classCode}</th>
                      <td>{item.className}</td>
                      <td>
                        <p
                          className="view-classes"
                          onClick={() => handleViewStudents(item)}
                        >
                          Chi tiết lớp
                        </p>
                      </td>
                      <td className="edit-major">
                        <Button
                          title="Sửa"
                          onClick={() => {
                            setModalUpdate(true);
                            setUpdClass(item);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
          <div className="add-major">
            <Button title="Thêm lớp" onClick={() => setModalAdd(true)} />
          </div>
        </div>
      </div>
      <Modal
        show={studentsModal}
        onHide={() => {
          setStudentsModal(false);
          setStudents([]);
          setErrorUpdate("");
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {selectedClass.classCode} - {selectedClass.className}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: "large" }}>
          <label>Thêm học sinh bằng file: </label> &#160;
          <input
            type="file"
            className="upload-file"
            onChange={(e) => setFileValue(e.target.files[0])}
            style={{ marginBottom: "20px" }}
          />
          <Table className="detail-score-table" responsive bordered hover>
            <thead>
              <tr>
                <th>Mã sinh viên</th>
                <th>Tên sinh viên</th>
              </tr>
            </thead>
            <tbody>
              {Boolean(students.length) &&
                students
                  .sort((a, b) => (a.studentCode < b.studentCode ? -1 : 1))
                  .map((item, index) => (
                    <tr key={index}>
                      <th>{item.studentCode}</th>
                      <th>{item.person.fullName}</th>
                    </tr>
                  ))}
              <tr>
                <th
                  contentEditable={true}
                  className="add-student-data"
                  colSpan="2"
                ></th>
              </tr>
            </tbody>
          </Table>
          <p style={{ color: "red", marginTop: "20px" }}>{errorUpdate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddStudents} title="Thêm học sinh" />
        </Modal.Footer>
      </Modal>
      {/* Add Modal */}
      <Modal
        size="md"
        show={modalAdd}
        onHide={() => {
          setModalAdd(false);
          setErrorUpdate("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Thêm lớp</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: "large" }}>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Mã lớp</th>
                <th>Tên lớp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th contentEditable={true} className="add-class-data"></th>
                <th contentEditable={true} className="add-class-data"></th>
              </tr>
            </tbody>
          </Table>
          <div style={{ marginTop: "20px" }}></div>
          <label htmlFor="add-class-data">Giáo viên chủ nhiệm:</label>
          &#160;&#160;
          <input
            name="add-class-data"
            onChange={(e) => {
              setTeacher(e.target.value);
            }}
          />
          <p style={{ color: "red", marginTop: "20px" }}>{errorUpdate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddClass} title="Xác nhận" />
        </Modal.Footer>
      </Modal>
      <Modal
        size="md"
        show={modalUpdate}
        onHide={() => {
          setModalUpdate(false);
          setErrorUpdate("");
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Cập nhật khoa
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center", fontSize: "large" }}>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Mã lớp</th>
                <th>Tên lớp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{updClass.classCode}</th>
                <th contentEditable={true} className="update-class-data">
                  {updClass.className}
                </th>
              </tr>
            </tbody>
          </Table>
          <p style={{ color: "red" }}>{errorUpdate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="Xác nhận"
            onClick={() => handleUpdataClass(updClass)}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ManageClass;
