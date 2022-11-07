import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import Chatroom from "./components/Chatroom/Chatroom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/chat" element={<Chatroom />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
