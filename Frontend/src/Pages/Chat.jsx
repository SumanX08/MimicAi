import { useLocation } from "react-router-dom";
import { useState } from "react";

import api from "../api/axios";

import ChatHeader from "../Components/ChatHeader";
import ChatMessages from "../Components/ChatMessages";
import ChatInput from "../Components/ChatInput";
import EmptyState from "../Components/EmptyState";

const Chat = () => {
  const { state } = useLocation();

  const initialPersona = state?.persona;

  const [selectedPersona, setSelectedPersona] =
    useState(initialPersona);

  const [chats, setChats] = useState({
    hitesh: [],
    piyush: [],
  });

  const [isTyping, setIsTyping] = useState(false);

  if (!selectedPersona) return null;

  const messages = chats[selectedPersona.id] || [];

  const handleSend = async (text) => {
    if (!text.trim() || isTyping) return;

    // Capture the persona for this request.
    // This prevents a response being added to the wrong chat.
    const currentPersonaId = selectedPersona.id;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const currentMessages =
      chats[currentPersonaId] || [];

    const updatedMessages = [
      ...currentMessages,
      userMessage,
    ];

    setChats((prev) => ({
      ...prev,
      [currentPersonaId]: updatedMessages,
    }));

    setIsTyping(true);

    try {
      const history = currentMessages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const { data } = await api.post("/chat", {
        persona: currentPersonaId,
        history,
        message: text,
      });

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      setChats((prev) => ({
        ...prev,
        [currentPersonaId]: [
          ...(prev[currentPersonaId] || []),
          aiMessage,
        ],
      }));
    } catch (error) {
      console.error(error);

      const errorMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Something went wrong. Please try again.",
      };

      setChats((prev) => ({
        ...prev,
        [currentPersonaId]: [
          ...(prev[currentPersonaId] || []),
          errorMessage,
        ],
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handlePersonaChange = (newPersona) => {
    if (isTyping) return;

    setSelectedPersona(newPersona);
  };

  return (
    <div className="relative h-screen bg-[#0B0F19] text-white flex flex-col">
      <ChatHeader
        persona={selectedPersona}
        onPersonaChange={handlePersonaChange}
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
