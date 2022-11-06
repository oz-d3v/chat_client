import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const port = 3001;
const socket = io.connect(`http://localhost:${port}`);

export const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
  }, []);

  const handleSubmit = () => {
    socket.emit("login", username, password);

    socket.on("verifying-login", (status, user) => {
      console.log("status", status);
      if (status === "login-success") {
        console.log(status, user);
        navigate("/chat", { state: { username } });
      } else {
        alert("Login failed");
      }
    });
    // navigate("/chat", { state: { username: username } });
  };

  return (
    <div className="mx-auto my-36 flex h-[300px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
      <div className="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
        <div className="h-7 w-3 bg-[#0DE6AC]"></div>
        <div className="w-3 text-center font-sans text-xl font-bold">
          <h1>Login</h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <input
          className="my-2 w-72 border p-2"
          type="email"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          className="my-2 w-72 border p-2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-72 border bg-[#0DE6AC] p-2 font-sans"
        >
          Login
        </button>
      </div>
      <div className="mx-7 my-3 flex justify-between text-sm font-semibold">
        <div>
          <h1>Forget Password</h1>
        </div>
        <div>
          <h1 className="underline underline-offset-2">Login</h1>
        </div>
      </div>
    </div>
  );
};
