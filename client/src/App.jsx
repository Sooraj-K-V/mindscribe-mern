import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Background from "./pages/background/Background.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddJournal from "./components/AddJournal.jsx"

function App() {
  return (
    <div>
      <Background />
      <div className="overlay"></div> {/* This darkens the background */}
      <Router>
        <div className="foreground-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/*components*/}
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/add" element={<AddJournal />}/> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
