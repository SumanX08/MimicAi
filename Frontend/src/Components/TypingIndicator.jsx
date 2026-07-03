const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 bg-[#1B1F2A] rounded-2xl px-4 py-3">
        <div
          className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
};

export default TypingIndicator;