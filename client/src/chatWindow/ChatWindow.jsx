import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const ChatWindow = () => {
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("");
    setMessages((messages) => [...messages, { message, room }]);
  };



  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
      <div className="bg-white p-10">
          <div>
              <form onSubmit={handleSubmit}>
                  <input
                  className="border border-black"
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                  />
                  <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                  />
                  <button type="submit" onSubmit={handleSubmit}>Send</button>
              </form>
          </div>
          <div>
              {messages.map((message, index) => (
                  <div key={index}>{message.message}</div>
              ))}
          </div>
      </div>
    
  );
};

export default ChatWindow;