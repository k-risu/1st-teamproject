import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import SignIn from "./pages/signin/SignIn";

function App() {
  return (
    <>
      <Router>
        {/* <Layout> */}
        <Routes>
          {/* 루트 경로에 SignIn 컴포넌트 추가 */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        {/* </Layout> */}
      </Router>
    </>
  );
}

export default App;
