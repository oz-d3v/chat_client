import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn } from "./components/SignIn";
import { SocketContext, socket } from "./Socket";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SocketContext.Provider value={socket}>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/chat" element={<App />} />
      </Routes>
    </Router>
  </SocketContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
