import PersonaCard from "../Components/PersonaCard";
import { personas } from "../data/personas";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSelect = (persona) => {
    navigate("/chat", {
      state: { persona },
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0F19] text-white">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-150 w-150 -translate-x-1/2 rounded-full bg-orange-500/20 blur-[180px]" />

      <div className="absolute bottom-0 right-0 h-150 w-150 rounded-full bg-sky-500/15 blur-[180px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Badge */}

        <div className="flex justify-center">
          <div className="rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-sm text-zinc-300">
            ✨ Powered by Persona AI
          </div>
        </div>

        {/* Hero */}

        <div className="mt-5 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Mimic AI
          </h1>

          <p className="mt-5 text-xl text-zinc-400">
            Choose a mentor to start chatting.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {personas.map((persona) => (
            <PersonaCard
  key={persona.id}
  persona={persona}
  onSelect={handleSelect}
/>
          ))}
        </div>

        {/* Footer */}

        <p className=" mt-28 text-center text-sm text-zinc-500">
          Not affiliated with the real Hitesh or Piyush — this is a fan-made
          persona demo.
        </p>
      </div>
    </div>
  );
};

export default Home;