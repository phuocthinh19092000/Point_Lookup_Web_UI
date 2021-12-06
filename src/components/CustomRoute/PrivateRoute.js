import React, { useEffect } from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useProvideAuth();
  if (user == null) {
    return "Loading...";
  } // user == null thì tiếp tục gọi useProvide chờ promise resolve
  const myUser = user == null ? null : user.data;
  if (myUser == {} || myUser == null) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  } // user = {} thì trả về
  const roles = myUser.roles.map((item) => {
    return item.roleCode;
  });
  return (
    <Route
      {...rest}
      render={() =>
        roles.includes("ADMIN") ? (
          children
        ) : roles.includes("TEACHER") ? (
          <Redirect
            to={{
              pathname: "/teacherprofile",
              state: "/login",
            }}
          />
        ) : (
          <Redirect
            to={{
              pathname: "/studentprofile",
              state: "/login",
            }}
          />
        )
      }
    />
  );
};

const useProvideAuth = () => {
  const token = localStorage.getItem("token");
  const USER_TOKEN = token ? "Bearer ".concat(token) : null;
  const [user, setUser] = useState(null);
  const [isCalled, setCalled] = useState(false);
  useEffect(() => {
    if (USER_TOKEN && !isCalled) {
      setCalled(true);
      axios
        .get("/api/findPerson")
        .then((res) => {
          // When request is finished:
          setUser(res.data || {}); // (1) write data to state
        })
        .catch((err) => console.log(err));
    } else {
      setUser({});
    }
  }, []);
  return { user };
};

export default PrivateRoute;
