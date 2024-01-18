/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import UserDetails from "./UserDetails.jsx";

const ChatWindow = ({ hidden, userDetails, handleLogout }) => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null); 


  useEffect(() => {
    socket.emit("userConnected", userDetails);
    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("userConnected", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("userDisconnected", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socket.on("disconnect", () => { 
      setError("Server is down");
    });
    if (error) {
      return <div>Error: {error}</div>;
    }
    return () => {
      socket.off("chatHistory");
      socket.off("userConnected");
      socket.off("chatMessage");
      socket.off("userDisconnected");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      // Send message to the server
      socket.emit("chatMessage", {
        message,
        id: socket.id,
        username: userDetails.customerName,
      });

      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div
      className={`bg-white border rounded-md border-gray-100 shadow-lg mr-10 p-2 pl-8 pr-8 fixed bottom-0 right-0 ${
        hidden ? "hidden" : "block"
      }`}
    >
      <div className="flex justify-between pb-8 border-b">
        <h1 className="text-2xl font-bold">Chat Window</h1>
{/*         <span onClick={() => handleLogout()} className="text-red-500">
          X
        </span> */}
      </div>

      <div>
        <div className="flex flex-col h-[450px] overflow-y-auto">
          {messages.map((message, index) => {
            switch (message.type) {
              case "userConnected":
                return (
                  <div>
                    <p>{message.message}</p>
                    <UserDetails details={message.userDetails} />
                  </div>
                );
              case "chatMessage":
                return (
                  <p
                    key={index}
                    style={{
                      color: message.id === socket.id ? "blue" : "black",
                      fontWeight: message.id === socket.id ? "bold" : "normal",
                    }}
                  >
                    <strong>{message.userName}:</strong>
                    {message.message}
                  </p>
                );
              case "userDisconnected":
                return (
                  <p
                    key={index}
                    style={{
                      color: message.id === socket.id ? "blue" : "black",
                      fontWeight: message.id === socket.id ? "bold" : "normal",
                    }}
                  >
                    {" "}
                    {message.message}
                  </p>
                );
              default:
                return null;
            }
          })}
        </div>
        <div className="flex items-center mt-4">
          <textarea
            className="border border-gray-300 px-2 py-1 mr-2 rounded-md resize-none w-full "
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
