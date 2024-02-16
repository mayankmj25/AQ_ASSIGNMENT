import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return <Router>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:userName" element={<UserProfile />}/>
      </Routes>
    </div>
    </Router>
}

export default App;
