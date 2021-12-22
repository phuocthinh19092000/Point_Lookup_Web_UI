import React from "react";
import "./Profile.css";
import defaultAvatar from "../../shared/assets/img/avatar.png";
import ProfileInput from "../ProfileInput/ProfileInput";
import Button from "../Button/Button";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = (props) => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    axios
      .get("/api/findPerson")
      .then((response) => {
        const data = response.data;
        setProfileData((pre) => data.data);
        localStorage.setItem("user", JSON.stringify(data.data));
        props.getUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChangeAvatar = (e) => {
    e.target
      .closest(".profile-avatar-container")
      .querySelector(".avatar-file")
      .click();
  };
  const handleApplyAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

  return (
    <div className="profile-container">
      <h2 className="profile-header-title">
        {props.title || "Thông tin sinh viên"}
      </h2>
      <div className="profile-detail-container">
        <div className="profile-avatar-container" onClick={handleChangeAvatar}>
          <img
            className="profile-avatar"
            src={avatar.preview || avatar}
            alt={avatar.preview || avatar}
          />
          <input
            type="file"
            className="avatar-file"
            name="avatar-img"
            id="file"
            style={{ display: "none" }}
            onChange={handleApplyAvatar}
          />
        </div>
        <div className="profile-detail-info">
          <ProfileInput
            title="- Họ và tên -  "
            disabled={true}
            value={profileData.fullName}
          />
          <ProfileInput
            title="- Thành phố -   "
            disabled={true}
            value={profileData.city}
          />
          <ProfileInput
            title="- Nơi ở hiện tại -   "
            disabled={true}
            value={profileData.address}
          />
          <ProfileInput
            title="- Số điện thoại -    "
            disabled={true}
            value={profileData.phone}
          />
          <ProfileInput
            title="-----  Email -----"
            disabled={true}
            value={profileData.email}
          />
          <ProfileInput title="- Số CMND - " value="" />
        </div>
      </div>
      <div className="study-detail-info">{props.children}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button title="Lưu" className="save-profile-btn" />
      </div>
    </div>
  );
};
export default Profile;
