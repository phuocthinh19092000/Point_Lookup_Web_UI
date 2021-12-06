import "./ProfileInput.css";

const ProfileInput = (props) => {
  return (
    <div className={props.inputClass || "info-item"}>
      <label htmlFor={props.title}>{props.title}</label>
      <input
        name={props.title}
        type="text"
        className={"profile-input"}
        disabled={props.disabled}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
};
export default ProfileInput;
