import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import StartingPage from "./pages/startingPage/StartingPage";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import MyPage from "./pages/mypage/MyPage";
import ProjectCreationPage from "./pages/projectCreation/ProjectCreationPage";
import MyPageEdit from "./pages/mypage/MyPageEdit";
import ProjectMembers from "./pages/projectMembers/ProjectMembers";
import Schedule from "./pages/calendar/Schedule";
import Modal from "./components/modal/Modal";
import DashBoard from "./pages/dashboard/DashBoard";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" />
            <Route path="/startingpage" element={<StartingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/myedit" element={<MyPageEdit />} />
            <Route path="/projectmembers" element={<ProjectMembers />} />
            <Route
              path="/projectCreationPage"
              element={<ProjectCreationPage />}
            />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/project" element={<DashBoard />} />
            <Route path="/modal" element={<Modal />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
