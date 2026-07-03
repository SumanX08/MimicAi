import { SendHorizontal } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ onSend, loading, persona }) => {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="border-t border-zinc-800 p-4 bg-[#11131A]">
      <div className="flex gap-4">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${persona.name.split(" ")[0]}...`}
          className="flex-1 resize-none rounded-2xl bg-[#0D1117] border border-zinc-800 px-6 py-4 outline-none"
        />

        <button
          disabled={loading}
          onClick={send}
          className="w-16 rounded-2xl bg-orange-500 text-black flex justify-center items-center hover:bg-orange-400"
        >
          <SendHorizontal />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;