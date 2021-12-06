import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ScoreStudent from "./pages/Student/ScoreStudent/ScoreStudent";
import ScoreTeacher from "./pages/Teacher/ScoreTeacher/ScoreTeacher";
import SubjectTeacher from "./pages/Teacher/SubjectTeacher/SubjectTeacher";
import ManageTeacherAccount from "./pages/Admin/ManageTeacherAccount/ManageTeacherAccount";
import ManageStudentAccount from "./pages/Admin/ManageStudentAccount/ManageStudentAccount";
import ManageMajor from "./pages/Admin/ManageMajor/ManageMajor";
import AdminProfile from "./pages/Admin/AdminProfile/AdminProfile";
import SubjectAdmin from "./pages/Admin/SubjectAdmin/SubjectAdmin";
import StudentProfile from "./pages/Student/StudentProfile/StudentProfile";
import TeacherProfile from "./pages/Teacher/TeacherProfile/TeacherProfile";
import ManageClass from "./pages/Admin/ManageClass/ManageClass";
import LandingPage from "./pages/LandingPage/LandingPage";
import Schedule from "./pages/Student/Schedule/Schedule";
import PrivateRoute from "./components/CustomRoute/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
axios.defaults.baseURL = "http://127.0.0.1:8080";
// axios.defaults.headers = {
//   Authorization: "Bearer ".concat(localStorage.getItem("token")),
// };
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  config.headers = Object.assign(
    {
      Authorization: `Bearer ${token}`,
    },
    config.headers
  );
  return config;
});

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/scorestudent" component={ScoreStudent} />
          <Route exact path="/scoreteacher" component={ScoreTeacher} />
          <Route exact path="/subjectteacher" component={SubjectTeacher} />
          <Route exact path="/subjectadmin" component={SubjectAdmin} />
          <Route
            exact
            path="/manageteacheraccount"
            component={ManageTeacherAccount}
          />
          <Route
            exact
            path="/managestudentaccount"
            component={ManageStudentAccount}
          />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/managemajor" component={ManageMajor} />
          <Route exact path="/manageclass" component={ManageClass} />
          <PrivateRoute path="/adminprofile">
            <AdminProfile />
          </PrivateRoute>
          {/* <Route exact path="/adminprofile" component={AdminProfile} /> */}
          <Route exact path="/teacherprofile" component={TeacherProfile} />
          <Route exact path="/studentprofile" component={StudentProfile} />
          <Route exact path="/schedule" component={Schedule} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
