import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Trash2,
  ChevronDown,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { personas } from "../data/personas";

const ChatHeader = ({ persona, onPersonaChange }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <header className="h-20 border-b  border-zinc-800 bg-[#11131A] px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 w">
        <button
          onClick={() => navigate("/")}
          className="p-3 rounded-xl border border-zinc-700 hover:bg-zinc-800"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3"
          >
            <img
              src={persona.image}
              alt={persona.name}
              className="w-14 h-14 rounded-xl"
            />

            <div className="text-left">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">
                  {persona.name}
                </h2>

                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </div>

              <p className="text-zinc-400 text-md">
                {persona.tagline}
              </p>
            </div>
          </button>

          {open && (
            <div className="absolute top-16 left-0 w-80 rounded-2xl border border-zinc-800 bg-[#1A1D26] shadow-2xl overflow-hidden z-50">
              {personas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onPersonaChange(p);
                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-zinc-800 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-12 h-12 rounded-lg"
                    />

                    <div className="text-left">
                      <p className="font-semibold">
                        {p.name}
                      </p>

                      <p className="text-sm text-zinc-400">
                        {p.tagline}
                      </p>
                    </div>
                  </div>

                  {persona.id === p.id && (
                    <Check
                      size={18}
                      className="text-orange-500"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button className="p-3 rounded-xl border border-zinc-700 hover:bg-zinc-800">
        <Trash2 size={20} />
      </button>
    </header>
  );
};

export default ChatHeader;