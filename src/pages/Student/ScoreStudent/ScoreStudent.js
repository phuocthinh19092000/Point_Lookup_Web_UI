import "./ScoreStudent.css";
import { Table } from "react-bootstrap";
import Header from "../../../components/Header/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ScoreStudent = () => {
  const [allScores, setAllScores] = useState([]);
  useEffect(() => {
    axios
      .get(
        "/api/findAllScoreByStudentCode?studentCode=" +
          JSON.parse(localStorage.getItem("user")).studentCode
      )
      .then((response) => {
        console.log(response.data);
        setAllScores(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const averageNumScore = (exe, mid, fin) => {
    const ave = exe * 0.2 + mid * 0.3 + fin * 0.5;
    return Math.round(ave * 100) / 100;
  };
  const averageLetScore = (numScore) => {
    if (numScore >= 9 ){
        return "A+"
    }else if (numScore >= 8.5){
        return "A"
    }else if (numScore >= 8){
        return "B+"
    }else if (numScore >= 7){
        return "B"
    }else if (numScore >= 6.5){
        return "C+"
    }else if (numScore >= 5.5){
        return "C"
    }else if (numScore >= 5){
        return "D+"
    }else if (numScore >= 4){
        return "D"
    }else{
        return "F"
    }
  };

  return (
    <div className="score-student-page">
      <Header isLoggedIn = {true} name ={JSON.parse(localStorage.getItem('user')).fullName}>
        <div className="nav-item-header">
          <b>Cá nhân</b>
          <div className="dropdown-content">
            <Link to="/studentprofile">Thông tin cá nhân</Link>
            <Link>Điểm thi</Link>
            <Link to="/schedule">Lịch học, lịch thi</Link>
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
      <h2 className="score-page-title">Kết quả học tập</h2>
      <div className="average-score">
        <h5>Điểm tổng hợp </h5>
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Học kì</th>
              <th>Số môn học</th>
              <th>Điểm trung bình ở học kì</th>
              <th>Điểm trung bình tích lũy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1/2021</th>
              <td>6</td>
              <td>9</td>
              <td>9</td>
            </tr>
            <tr>
              <th>2/2021</th>
              <td>5</td>
              <td>10</td>
              <td>9.8</td>
            </tr>
            <tr>
              <th>3/2021</th>
              <td>10</td>
              <td>8</td>
              <td>8.7</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="detail-score">
        <h5>Điểm chi tiết</h5>
        <Table className="detail-score-table" responsive bordered hover>
          <thead>
            <tr>
              <th>STT</th>
              <th>Môn học</th>
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
            {allScores && allScores.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.subjects.subjectName}</td>
                <td>{item.assignmentScore >= 0 && item.assignmentScore}</td>
                <td>{item.midtermScore >=0 && item.midtermScore}</td>
                <td>{item.finalScore >=0 && item.finalScore}</td>
                <td>
                  { item.finalScore >=0 && averageNumScore(
                    item.assignmentScore,
                    item.midtermScore,
                    item.finalScore
                  )}
                </td>
                <td>
                  {item.finalScore >=0 && averageLetScore(
                    averageNumScore(
                      item.assignmentScore,
                      item.midtermScore,
                      item.finalScore
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
export default ScoreStudent;
