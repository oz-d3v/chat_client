import { io } from "socket.io-client";
import React from "react";
// import { SOCKET_URL } from "config";
const SOCKET_URL = "http://localhost:3001";
export const socket = io.connect(SOCKET_URL);
export const SocketContext = React.createContext();
