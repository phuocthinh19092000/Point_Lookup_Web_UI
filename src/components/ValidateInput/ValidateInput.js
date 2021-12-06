import "./ValidateInput.css";
import { useState } from "react";

let validatorRules = {
  required: function (value) {
    return value.trim() ? undefined : "Vui lòng nhập trường này";
  },
  email: function (value) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? undefined : "Vui lòng nhập Email";
  },
  min: function (min) {
    return function (value) {
      return value.length >= min
        ? undefined
        : `Vui lòng nhập ít nhất ${min} kí tự`;
    };
  },
  max: function (max) {
    return function (value) {
      return value.length <= max
        ? undefined
        : `Vui lòng nhập ít nhất ${max} kí tự`;
    };
  },
  confirm: function (selector) {
    return function (value) {
      let confirmedValue = document.querySelector("#" + selector).value;
      return value === confirmedValue
        ? undefined
        : "Vui lòng xác nhận lại mật khẩu";
      //get value from selector by id (name|class)
    };
  },
};

const ValidateInput = (props) => {
  const [isValid, setIsValid] = useState(true);
  const [formMessage, setFormMessage] = useState("");
  const [value, setValue] = useState("");
  const [dropdownList, setDropdownList] = useState([]);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const handleOnChange = (e) => {
    setValue(e.target.value);
    setIsShowDropdown(true)
    props.dropdownList && setDropdownList(
      props.dropdownList.filter((item) => item.toUpperCase().includes(e.target.value.toUpperCase()))
    );
    if (!isValid) {
      setIsValid(true);
      setFormMessage("");
    }
  };
  const handleOnBlur = (e) => {
    if (props.rules) {
      let errorMessage;
      let rules = props.rules.split("|");
      for (let rule of rules) {
        let ruleFunc = validatorRules[rule];

        // check if rule has Param (function in function) => get internal function
        if (rule.includes(":")) {
          let ruleInfor = rule.split(":");
          rule = ruleInfor[0];
          // // if ruleInfor[1] (parameter 1) is a number =>  max, min rules
          // if (Number(ruleInfor[1])){
          //     ruleFunc = validatorRules[rule](ruleInfor[1])
          // }
          // else{ // => confirm rule
          ruleFunc = validatorRules[rule](ruleInfor[1]);
          // }
          // get the internal function
        }
        // console.log(ruleFunc);
        switch (props.type) {
          case "checkbox":
          case "radio":
            break;
          default:
            errorMessage = ruleFunc(e.target.value);
        }
        if (errorMessage) break;
      }
      if (errorMessage) {
        setFormMessage(errorMessage);
        setIsValid(false);
      } else {
        setIsValid(true);
        setFormMessage("");
      }
    }
  };
  return (
    <div className={isValid ? "form-group" : "form-group invalid"}>
      <label className="form-label" htmlFor={props.name}>
        {props.lable}
      </label>
      <input
        autoComplete="off"
        type={props.type}
        name={props.name}
        value={value}
        className="form-control"
        id={props.id}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        placeholder={props.placeholder}
      />
      <span className="form-message">{formMessage}</span>
      {isShowDropdown && dropdownList && value && (
        <div className="input-search-dropdown">
          {dropdownList.map((item, index) => (
            <div key = {index} className="input-dropdown-item" onClick={() => {setValue(item); setIsShowDropdown(false) }}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ValidateInput;
