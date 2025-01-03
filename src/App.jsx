import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";

import Schedule from "./pages/calendar/Schedule";
import DashBoard from "./pages/dashboard/DashBoard";
import MyPage from "./pages/mypage/MyPage";
// import MyPageEdit from "./pages/mypage/MyPageEdit";
import NotFound from "./pages/NotFound";
import ProjectCreationPage from "./pages/projectCreation/ProjectCreationPage";
import ProjectList from "./pages/projectlist/ProjectList";
import ProjectMembers from "./pages/projectMembers/ProjectMembers";
import SignIn from "./pages/signin/SignIn";
import SigninRepw from "./pages/signin/SigninRepw";
import SignUp from "./pages/signup/SignUp";
import StartingPage from "./pages/startingPage/StartingPage";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<StartingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* 새로운 비밀번호 재설정 페이지 */}
            <Route path="/signin/repw" element={<SigninRepw />} />
            <Route path="/mypage" element={<MyPage />} />
            {/* <Route path="/mypage/myedit" element={<MyPageEdit />} /> */}
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/project" element={<DashBoard />} />
            <Route path="/project/list" element={<ProjectList />} />
            <Route path="/project/members" element={<ProjectMembers />} />
            <Route path="/project/create" element={<ProjectCreationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
