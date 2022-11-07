import { io } from "socket.io-client";
import axios from "axios";
const SERVER_URL = "http://localhost:3001";
export const socket = io.connect("http://localhost:3001");
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.getUsers = async () => {
  var res = axios.get(`${SERVER_URL}/get-users`);
  return (await res).data;
};

socket.getChatHistory = async () => {
  var res = await axios.get(`${SERVER_URL}/get-chat-history`);
  return (await res).data;
};
