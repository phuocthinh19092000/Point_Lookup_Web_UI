import "../../pages/Register/Register.css";
import ValidateInput from "../ValidateInput/ValidateInput";
import Button from "../Button/Button";
const ChangePassword = () => {
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
          type="text"
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
        <Button title="Xác nhận" />
      </form>
    </div>
  );
};

export default ChangePassword;
