import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import StudentsPage from "./components/StudentsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
