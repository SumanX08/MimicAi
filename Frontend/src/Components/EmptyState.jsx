const EmptyState = ({ persona }) => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <img
          src={persona.image}
          alt={persona.name}
          className="w-24 h-24 rounded-full mx-auto"
        />

        <h2 className="mt-6 text-2xl font-bold">
          Chat with {persona.name}
        </h2>

        <p className="mt-2 text-zinc-400">
          Ask anything about coding, career, or development.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;