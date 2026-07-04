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

  // Separate message history for each persona
  const [chats, setChats] = useState({
    hitesh: [],
    piyush: [],
  });

  const [isTyping, setIsTyping] = useState(false);

  // Current persona messages
  const messages = chats[selectedPersona.id] || [];

  const handleSend = async (text) => {
    if (!text.trim() || isTyping) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    // Add user message only to current persona chat
    setChats((prev) => ({
      ...prev,
      [selectedPersona.id]: updatedMessages,
    }));

    setIsTyping(true);

    try {
      // Send previous conversation as history.
      // Current message is already sent separately as `message`.
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const { data } = await api.post("/chat", {
        persona: selectedPersona.name,
        history,
        message: text,
      });

      const aiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
      };

      // Add AI response to current persona chat
      setChats((prev) => ({
        ...prev,
        [selectedPersona.name]: [
          ...prev[selectedPersona.name],
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
        [selectedPersona.id]: [
          ...prev[selectedPersona.name],
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

  if (!persona) return null;

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
