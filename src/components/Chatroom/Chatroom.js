import "./Chatroom.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { socket } from "../../Socket";
import { useNavigate } from "react-router-dom";

function Chatroom() {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [incomingMessage, setIncomingMessage] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [users, setUsers] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [users]);

  useEffect(() => {
    setUsername(location.state.username);
    socket.on("receive-message", (message, secondPerson) => {
      setIncomingMessage([...incomingMessage, { message, secondPerson }]);
    });
  }, [incomingMessage, location.state.username]);

  const fetchData = async () => {
    const fetchUsers = await socket.getUsers();
    setUsers(fetchUsers);

    const fetchChatHistory = await socket.getChatHistory();
    setChatHistory(fetchChatHistory);
  };

  const handleSubmit = () => {
    setMessage(""); // empty input field
    socket.emit("send-message", message, username);
  };

  const handleLogout = () => {
    socket.emit("logout", username);
    socket.on("verifying-logout", () => {
      navigate("/");
    });
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
          </div>

          {users.map((user, idx) => {
            return (
              <div
                key={idx}
                className="mt-3 flex items-center h-8 hover:bg-gray-300 text-sm px-3"
              >
                <div style={{ width: 80 }}>
                  <span className="ml-2 leading-none">{user.username}</span>
                </div>
                {user.onlineStatus ? (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                ) : (
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                )}
              </div>
            );
          })}

          <div className="mt-4">
            <div id="messages_list">
              <span className="leading-none font-bold pl-3">#Chatroom</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="mx-7 my-3 flex justify-between text-sm font-semibold">
          <h3 className="text-grey-darkest mb-1 font-extrabold">
            Logged in as {username}
          </h3>
          <button
            className="w-20 h-8 rounded-full bg-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
          {/* <div className="text-grey-dark text-sm truncate">Logout</div> */}
        </div>
        Chat messages
        <div className="px-6 py-4 flex-1 overflow-y-scroll">
          {/* {chatHistory.map((message, idx) => {
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
          })} */}
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

export default Chatroom;
