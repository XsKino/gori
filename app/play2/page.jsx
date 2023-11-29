"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Page() {
  //mensajes para mandar
  const [message, setMessage] = useState("");
  //mensajes de la conversacion
  const [messages, setMessages] = useState([]);
  //Conversacion seleccionada
  const [conversations, setConversations] = useState([]);
  //thread de mensajes
  const [threadMessages, setThreadMessages] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("User");
    localStorage.removeItem("id");

    axios
      .get(`api/user/${user}`)
      .then((response) => {
        console.log(response.data);
        setConversations(response.data.user.conversaciones);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const sendMessage = async () => {
    let id = localStorage.getItem("id");
    if (id) {
      const response = await axios.post(`/api/IA/${id}`, { msg: message });
      processMessages(response.data.test);
      axios.put(`/api/user/${localStorage.getItem("User")}`, {
        nombre: "SMBD",
        ultimo_mensaje: message,
        id: response.data.id,
      });
    } else {
      try {
        const response = await axios.post("/api/IA", { msg: message });
        localStorage.setItem("id", response.data.id);
        processMessages(response.data.test);
        axios.put(`/api/user/${localStorage.getItem("User")}`, {
          nombre: "SMBD",
          ultimo_mensaje: message,
          id: response.data.id,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchMessages = async (id) => {
    localStorage.setItem("id", id);
    try {
      const response = await axios.get(`/api/IA/${id}`);
      const processedMessages = processMessages(response.data.test);
      setThreadMessages(processedMessages);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  const processMessages = (messageArray) => {
    let msgs = [];
    messageArray.reverse().forEach((message) => {
      message.content.forEach((content) => {
        msgs.push({ role: message.role, text: content.text.value });
      });
    });
    setMessages(msgs);
  };

  return (
    <div className="flex h-screen">
      {/* Parte izquierda - Chatbot */}
      <div className="w-1/2 p-4 bg-gray-900 rounded-l-lg flex flex-col flex-grow">
        <div className="mb-4 text-white flex-grow overflow-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "text-green-500 mb-2"
                  : "text-blue-500 mb-2"
              }
            >
              <strong>{message.role === "user" ? "User:" : "Bot:"}</strong>{" "}
              {message.text}
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <div className="flex justify-between">
            <input
              className="w-full px-2 py-1 rounded-l-lg bg-gray-800 text-white focus:outline-none"
              type="text"
              placeholder="Escribe tu mensaje..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button
              className="w-1/4 bg-blue-500 rounded-r-lg text-white hover:bg-blue-600 py-4"
              onClick={sendMessage}
              disabled={!message}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Parte derecha - "SMBD" */}
      <div className="w-1/2 p-4 bg-gray-800 rounded-r-lg">
        Convesaciones
        <div className="text-gray-800 mt-5">
          {conversations &&
            conversations.map((conversation, index) => (
              <div
                key={index}
                className="mb-4 bg-gray-200 p-4 rounded-lg "
                onClick={() => fetchMessages(conversation.id)}
              >
                <h2 className="text-xl font-bold text-blue-500">
                  {conversation.nombre}
                </h2>
                <p className="text-gray-600">{conversation.ultimo_mensaje}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
