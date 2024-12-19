import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import StartingPage from "./pages/startingPage/StartingPage";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/signin/SignIn";
import ProjectCreationPage from "./pages/projectCreation/ProjectCreationPage";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" />
            <Route path="/StartingPage" element={<StartingPage />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/ProjectCreationPage"
              element={<ProjectCreationPage />}
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
