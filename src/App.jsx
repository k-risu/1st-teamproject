import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import StartingPage from "./pages/startingPage/StartingPage";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import ProjectCreationPage from "./pages/projectCreation/ProjectCreationPage";
import ProjectMembers from "./pages/projectMembers/ProjectMembers";
import Schedule from "./pages/calendar/Schedule";
import Modal from "./components/modal/Modal";

function App() {
  return (
    <>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/" />
          <Route path="/startingpage" element={<StartingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/projectmembers" element={<ProjectMembers />} />
          <Route
            path="/projectcreationpage"
            element={<ProjectCreationPage />}
          />
        </Routes>
        {/* </Layout> */}
      </Router>
    </>
  );
}

export default App;
