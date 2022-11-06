import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import io from "socket.io-client";
import Chatroom from "./components/Chatroom/Chatroom";

const socket = io.connect("http://localhost:3001");
// socket.on("connect", () => {
//   console.log("Connected to server");
// });
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn socket={socket} />} />
        <Route path="/chat" element={<Chatroom socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
