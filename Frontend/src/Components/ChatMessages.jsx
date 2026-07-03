import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const ChatMessages = ({ messages, persona, isTyping }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          persona={persona}
        />
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;