// import "./App.css";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// // Connect to the server
// const port = 3001;
// const socket = io.connect(`http://localhost:${port}`);
// socket.on("connect", () => {
//   console.log("Connected");
// });

// function App() {
//   const [message, setMessage] = useState("");
//   const [username, setUsername] = useState("");
//   const [incomingMessage, setIncomingMessage] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [chatHistory, setChatHistory] = useState([]);

//   const location = useLocation();

//   useEffect(() => {
//     socket.on("fetch-users", (users) => {
//       setUsers(users);
//       console.log("users", users);
//     });
//   }, [users]);

//   useEffect(() => {
//     socket.on("get-messages", (messages) => {
//       setChatHistory(messages);
//     });
//   }, []);

//   useEffect(() => {
//     setUsername(location.state.username);

//     socket.on("receive-message", (message, secondPerson) => {
//       setIncomingMessage([...incomingMessage, { message, secondPerson }]);
//     });
//   }, []);

//   const handleSubmit = () => {
//     setMessage(""); // empty input field
//     socket.emit("send-message", message, username);
//   };

//   return (
//     // <div classNameName="App">
//     //   hello world {incomingMessage}
//     //   <div classNameName="inputBox">
//     //     <input
//     //       onChange={(e) => setMessage(e.target.value)}
//     //       type="text"
//     //       id="chatInput"
//     //     />
//     //     <button onClick={handleSubmit}>send</button>
//     //   </div>
//     // </div>

//     <div className="font-sans antialiased h-screen flex">
//       <div className="flex flex-col flex-shrink-0 w-64 border-r border-gray-300 bg-gray-100">
//         <div className="h-0 overflow-auto flex-grow">
//           {/* <div className="mt-3 flex items-center h-8 hover:bg-gray-300 text-sm px-3">
//             <svg
//               className="h-4 w-4"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
//               />
//             </svg>
//             <span className="ml-2 leading-none">Users</span>
//             {users.map((user, idx) => {
//               console.log(user);
//               return (
//                 <div key={idx} className="pl-2">
//                   {user.username}
//                 </div>
//               );
//             })}
//           </div> */}
//           <span className="ml-2 leading-none">Users</span>
//           {users.map((user, idx) => {
//             console.log(user);
//             return (
//               <div key={idx} className="pl-2">
//                 {user.username}
//                 {user.onlineStatus === true ? (
//                   <span className="w-2 h-2 rounded-full bg-green-500">""</span>
//                 ) : (
//                   <span className="w-2 h-2 rounded-full bg-red-500">""</span>
//                 )}
//               </div>
//             );
//           })}
//           <div className="mt-4">
//             <div id="messages_list">
//               {/* <div className="flex">
//                 <span className="w-2 h-2 rounded-full bg-blue-500"></span>
//               </div> */}
//               <span className="leading-none font-bold pl-3">Chat room</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex-1 flex flex-col bg-white overflow-hidden">
//         <div className="border-b flex px-6 py-2 items-center flex-none">
//           <div className="flex flex-col">
//             <h3 className="text-grey-darkest mb-1 font-extrabold">
//               Logged in as {username}
//             </h3>
//             <div className="text-grey-dark text-sm truncate">
//               Chit-chattin' about ugly HTML and mixing of concerns.
//             </div>
//           </div>
//           <div className="ml-auto hidden md:block"></div>
//         </div>
//         Chat messages
//         <div className="px-6 py-4 flex-1 overflow-y-scroll">
//           {chatHistory.map((message, idx) => {
//             return (
//               <div key={idx} className="flex items-start mb-4 text-sm">
//                 <div className="flex-1 overflow-hidden">
//                   <div>
//                     <span className="font-bold">{message.username}</span>
//                   </div>
//                   <p className="text-black leading-normal">{message.message}</p>
//                 </div>
//               </div>
//             );
//           })}
//           {incomingMessage.map((msg, idx) => {
//             return (
//               <div key={idx} className="flex items-start mb-4 text-sm">
//                 <div className="flex-1 overflow-hidden">
//                   <div>
//                     <span className="font-bold">{msg.secondPerson}</span>
//                   </div>
//                   <p className="text-black leading-normal">{msg.message}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//         <div className="pb-6 px-4 flex-none">
//           <div className="flex rounded-lg border-2 border-grey overflow-hidden">
//             <span className="text-3xl text-grey border-r-2 border-grey p-2">
//               <svg
//                 className="fill-current h-6 w-6 block"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" />
//               </svg>
//             </span>
//             <input
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               type="text"
//               className="w-full px-4"
//               placeholder="Message #general"
//             />
//             <button
//               onClick={handleSubmit}
//               style={{ color: "red", backgroundColor: "blue" }}
//             >
//               send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import "./App.css";
import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { SocketContext } from "./Socket";

// Connect to the server

// const channelID = socket.id;

function App() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [incomingMessage, setIncomingMessage] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [users, setUsers] = useState([]);

  const socket = useContext(SocketContext);
  const location = useLocation();

  useEffect(() => {
    socket.on("fetch-users", (users) => {
      console.log(users);
      setUsers(users);
    });

    socket.on("get-messages", (messages) => {
      setChatHistory(messages);
    });
  }, []);

  useEffect(() => {
    setUsername(location.state.username);
    socket.on("receive-message", (message, secondPerson) => {
      setIncomingMessage([...incomingMessage, { message, secondPerson }]);
    });
  }, [incomingMessage, location.state.username]);

  const handleSubmit = () => {
    setMessage(""); // empty input field
    socket.emit("send-message", message, username);
  };

  return (
    <div className="font-sans antialiased h-screen flex">
      <div className="flex flex-col flex-shrink-0 w-64 border-r border-gray-300 bg-gray-100">
        <div className="h-0 overflow-auto flex-grow">
          <div className="mt-3 flex items-center h-8 hover:bg-gray-300 text-sm px-3">
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span className="ml-2 leading-none">Users</span>
            <div>
              {users.map((user, idx) => {
                return (
                  <div key={idx}>
                    <span className="ml-2 leading-none">{user.username}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4">
            <div id="messages_list">
              <span className="leading-none font-bold pl-3">#App</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="border-b flex px-6 py-2 items-center flex-none">
          <div className="flex flex-col">
            <h3 className="text-grey-darkest mb-1 font-extrabold">
              Logged in as {username}
            </h3>
            <div className="text-grey-dark text-sm truncate">
              Chit-chattin' about ugly HTML and mixing of concerns.
            </div>
          </div>
          <div className="ml-auto hidden md:block"></div>
        </div>
        Chat messages
        <div className="px-6 py-4 flex-1 overflow-y-scroll">
          {chatHistory.map((message, idx) => {
            return (
              <div key={idx} className="flex items-start mb-4 text-sm">
                <div className="flex-1 overflow-hidden">
                  <div>
                    <span className="font-bold">{message.username}</span>
                  </div>
                  <p className="text-black leading-normal">{message.message}</p>
                </div>
              </div>
            );
          })}
          {incomingMessage.map((msg, idx) => {
            return (
              <div key={idx} className="flex items-start mb-4 text-sm">
                <div className="flex-1 overflow-hidden">
                  <div>
                    <span className="font-bold">{msg.secondPerson}</span>
                  </div>
                  <p className="text-black leading-normal">{msg.message}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="pb-6 px-4 flex-none">
          <div className="flex rounded-lg border-2 border-grey overflow-hidden">
            <span className="text-3xl text-grey border-r-2 border-grey p-2">
              <svg
                className="fill-current h-6 w-6 block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" />
              </svg>
            </span>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              className="w-full px-4"
              placeholder="Message #general"
            />
            <button
              onClick={handleSubmit}
              style={{ color: "red", backgroundColor: "blue" }}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
