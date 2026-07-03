const MessageBubble = ({ message, persona }) => {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="rounded-3xl bg-orange-500 text-black px-4 py-2 max-w-md">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 items-start">
      <img
        src={persona.image}
        alt={persona.name}
        className="w-10 h-10 rounded-lg"
      />

      <div>
        <h4 className="text-sm text-zinc-400 mb-2">{persona.name}</h4>

        <div className="bg-[#171B25] rounded-3xl px-4 py-2 max-w-3xl border border-zinc-800">
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;