import "../../pages/Register/Register.css";
import ValidateInput from "../ValidateInput/ValidateInput";
import Button from "../Button/Button";
import axios from "axios";
const ChangePassword = () => {
  const handleChangePassword = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const inputValues = document.querySelectorAll(".form-control");
    if (inputValues[2].value !== inputValues[1].value) {
      document.querySelectorAll(".form-message")[2].textContent =
        "Vui lòng xác nhận lại mật khẩu";
    } else {
      const data = {
        passWord: inputValues[1].value,
        userName: user.userName,
      };

      axios
        .put("/api/updatePerson", data)
        .then((response) => {
          alert(response.data);
          inputValues.forEach((item) => (item.value = ""));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="register-container">
      <form action="" method="POST" className="form-register">
        <h2 className="register-form-heading">Đổi mật khẩu</h2>
        <p className="register-form-desc">Hệ thống quản lý tra cứu điểm</p>
        <div className="spacer"></div>
        <ValidateInput
          type="password"
          name="currentPassword"
          rules="required"
          lable="Mật khẩu hiện tại"
        />
        <ValidateInput
          type="password"
          name="newPassword"
          id="newPassword"
          rules="required"
          lable="Mật khẩu mới"
        />
        <ValidateInput
          type="password"
          name="confirmNewPassword"
          rules="required|confirm:newPassword"
          lable="Xác nhận lại mật khẩu mới"
        />
        <Button title="Xác nhận" onClick={handleChangePassword} />
      </form>
    </div>
  );
};

export default ChangePassword;
