import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginSuccess from "./pages/LoginSuccess";
import DeleteAccount from "./pages/DeleteAccount";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<LoginSuccess />} />
        <Route path="/delete" element={<DeleteAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
