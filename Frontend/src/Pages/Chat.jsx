import { useLocation } from "react-router-dom";
import { useState } from "react";

import api from "../api/axios";

import ChatHeader from "../Components/ChatHeader";
import ChatMessages from "../Components/ChatMessages";
import ChatInput from "../Components/ChatInput";
import EmptyState from "../Components/EmptyState";

const Chat = () => {
  const { state } = useLocation();

  const persona = state?.persona;

  const [selectedPersona, setSelectedPersona] = useState(persona);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setIsTyping(true);

    try {
      const history = updatedMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const { data } = await api.post("/chat", {
        persona: selectedPersona,
        history,
        message: text,
      });

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!persona) return null;

  return (
    <div className="relative h-screen bg-[#0B0F19] text-white flex flex-col">
      <ChatHeader
        persona={selectedPersona}
        onPersonaChange={setSelectedPersona}
      />

      {messages.length === 0 && !isTyping ? (
        <EmptyState persona={selectedPersona} />
      ) : (
        <ChatMessages
          messages={messages}
          persona={selectedPersona}
          isTyping={isTyping}
        />
      )}

      <ChatInput
        onSend={handleSend}
        loading={isTyping}
        persona={selectedPersona}
      />
    </div>
  );
};

export default Chat;
