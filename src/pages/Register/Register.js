import "./Register.css";
import Button from "../../components/Button/Button";
import ValidateInput from "../../components/ValidateInput/ValidateInput";
import ValidateSelect from "../../components/ValidateSelect/ValidateSelect";
import { useHistory } from "react-router-dom";
import axios from "axios";
const Register = () => {
  const history = useHistory();
  const handleOnClick = (e) => {
    e.preventDefault();
    const registerData = {};
    const inputData = document.querySelectorAll(".form-control");
    inputData.forEach((data) => {
      registerData[data.name] = data.value;
    });
    registerData[registerData["role"]] = registerData["codeID"];
    delete registerData["role"];
    delete registerData["codeID"];
    delete registerData["confirmPassword"];
    axios
      .post("/api/register", registerData)
      .then((response) => {
        alert(response.data);
        history.push("/login");
      })
      .catch((error) => {
        console.log(error.message);
        alert("Tên người dùng đã tồn tại");
      });
  };
  return (
    <div className="register-container">
      <form action="" method="POST" className="form-register">
        <h2 className="register-form-heading">Đăng kí tài khoản</h2>
        <p className="register-form-desc">Hệ thống quản lý tra cứu điểm</p>
        <div className="spacer"></div>

        <ValidateInput
          type="text"
          name="userName"
          rules="required"
          lable="Tên đăng nhập"
        />
        <ValidateInput
          type="password"
          name="passWord"
          id="passWord"
          rules="required"
          lable="Mật khẩu "
        />
        <ValidateInput
          type="password"
          name="confirmPassword"
          rules="required|confirm:passWord"
          lable="Xác nhận lại mật khẩu"
        />
        <ValidateInput
          type="text"
          name="fullName"
          rules="required"
          lable="Họ và tên"
        />
        <ValidateInput
          type="text"
          name="email"
          rules="required|email"
          lable="Email"
        />
        <ValidateInput
          type="number"
          name="phone"
          rules="required"
          lable="Số điện thoại"
        />
        <ValidateInput
          type="text"
          name="city"
          rules="required"
          lable="Thành phố"
        />
        <ValidateInput
          type="text"
          name="address"
          rules="required"
          lable="Địa chỉ"
        />
        <div className="role-select">
          <ValidateSelect name="role" lable="Role">
            <option value="studentCode">Học sinh</option>
            <option value="teacherCode">Giáo viên</option>
          </ValidateSelect>
          <ValidateInput
            type="text"
            name="codeID"
            rules="required"
            lable={"Mã"}
          />
        </div>

        <Button title="Đăng kí" onClick={handleOnClick} />
      </form>
    </div>
  );
};
export default Register;
