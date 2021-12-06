import Table from "react-bootstrap/Table";
import Header from "../../../components/Header/Header";
import { Link } from "react-router-dom";
import Button from "../../../components/Button/Button";
import ValidateInput from "../../../components/ValidateInput/ValidateInput";
import ValidateSelect from "../../../components/ValidateSelect/ValidateSelect";

const Schedule = () => {
  return (
    <>
      <Header isLoggedIn={true} name ={JSON.parse(localStorage.getItem('user')).fullName}>
        <div className="nav-item-header">
          <b>Cá nhân</b>
          <div className="dropdown-content">
            <Link to="/studentprofile">Thông tin cá nhân</Link>
            <Link to="/scorestudent">Điểm thi</Link>
            <Link>Lịch học, lịch thi</Link>
            <Link to="/changepassword">Đổi mật khẩu</Link>
          </div>
        </div>
        <div className="nav-item-header">
          <b>Yêu cầu</b>
          <div className="dropdown-content">
            
          </div>
        </div>
        <div className="nav-item-header">
          <b>Khác</b>
          <div className="dropdown-content">
            
          </div>
        </div>
      </Header>
      <div class="schedule-page">
        <h2 style ={{margin:"10px 30px", borderBottom:"solid 1px #111"}}>Lịch học, lịch thi</h2>
        <div class="search-container">
          <ValidateSelect  lable="Học kì">
            <option value="Học kì 1/2021">Học kì 1/2021</option>
            <option selected value="Học kì 2/2021">
              Học kì 2/2021
            </option>
            <option value="Học kì 3/2021">Học kì 3/2021</option>
            <option value="Học kì 4/2021">Học kì 4/2021</option>
          </ValidateSelect>
          <Button title="Dữ liệu"/>
            
          
        </div>
        <div class="average-score">
          <h5 style ={{borderBottom:"solid 1px #111"}}>Lịch học </h5>
          <Table class="table">
            <thead>
              <tr>
                <th scope="col">Môn học</th>
                <th scope="col">Giáo viên</th>
                <th scope="col">Thời khóa biểu</th>
                <th scope="col">Tuần học</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Toán</th>
                <td>Nguyễn Thị A</td>
                <td>Thứ 2,7-10,F306; Thứ 3,1-4,F209</td>
                <td>45-50</td>
              </tr>
              <tr>
                <th scope="row">Lý</th>
                <td>Nguyễn Thị A</td>
                <td>Thứ 2,7-10,F306; Thứ 3,1-4,F209</td>
                <td>45-50</td>
              </tr>
              <tr>
                <th scope="row">Hóa</th>
                <td>Nguyễn Thị A</td>
                <td>Thứ 2,7-10,F306; Thứ 3,1-4,F209</td>
                <td>45-50r</td>
              </tr>
            </tbody>
          </Table>
        </div>

        <div class="detail-score">
          <h5 style ={{borderBottom:"solid 1px #111"}}>Lịch thi</h5>
          <Table class="table">
            <thead>
              <tr>
                <th scope="col" class="semester">
                  STT
                </th>
                <th scope="col" class="subject">
                  Môn học
                </th>
                <th scope="col">Nhóm thi</th>
                <th scope="col">Thi chung</th>
                <th scope="col">Lịch thi cuối kì</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Toán ứng dụng công nghệ Thông tin</td>
                <td>10</td>
                <td>10</td>
                <td>Ngày: 05/09/2021, Phòng: , Giờ: 15h00, Xuất: 2C4</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Cấu trúc dữ liệu</td>
                <td>9</td>
                <td>9</td>
                <td>Ngày: 05/09/2021, Phòng: , Giờ: 15h00, Xuất: 2C4</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Hệ thống thông tin</td>
                <td>8</td>
                <td>8</td>
                <td>Ngày: 05/09/2021, Phòng: , Giờ: 15h00, Xuất: 2C4</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Schedule;
