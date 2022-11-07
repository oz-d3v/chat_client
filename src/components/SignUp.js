import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../Socket";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    socket.emit("signup", username, password);

    socket.on("verifying-signup", (status) => {
      if (status === "signup-success") {
        navigate("/");
      } else {
        setError(status);
      }
    });
  };

  return (
    <div className="mx-auto my-36 flex h-[300px] w-[350px] flex-col border-2 bg-white text-black shadow-xl">
      <div className="mx-8 mt-7 mb-1 flex flex-row justify-start space-x-2">
        <div className="h-7 w-3 bg-[#0DE6AC]"></div>
        <div className="w-3 text-center font-sans text-xl font-bold">
          <h1>Register now</h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <input
          className="my-2 w-72 border p-2"
          type="email"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
        <input
          className="my-2 w-72 border p-2"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          onClick={handleSubmit}
          className="w-72 border bg-[#0DE6AC] p-2 font-sans"
        >
          Register
        </button>
      </div>
      <div className="mx-7 my-3 flex justify-between text-sm font-semibold">
        <div></div>
        <div>
          <a href="/">
            <h1 className="underline underline-offset-2 blue-500">
              Already a user? signin
            </h1>
          </a>
        </div>
      </div>
      <div className="mx-7 my-3 text-sm font-semibold">
        <div style={{ color: "red" }}>{error}</div>
      </div>
    </div>
  );
};
