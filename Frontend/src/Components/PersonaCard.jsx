import { ArrowRight } from "lucide-react";

const PersonaCard = ({ persona, onSelect }) => {
  const { name, image, tagline, description, accent } = persona;


  return (
    <div
      className="
        group
        flex flex-col
        h-full
        rounded-3xl
        border border-orange-500/20
        bg-linear-to-br
        from-[#1b1d24]
        via-[#2d1b10]
        to-[#111318]
        p-5
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-orange-500
        hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)]
        hover:from-[#171c29]
        hover:via-[#3c2310]
        hover:to-[#181b27]
        hover:cursor-pointer
      "
    >
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <img
            src={image}
            alt={name}
            className="h-20 w-20 rounded-2xl border border-white/10 object-cover"
          />

          <div>
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="mt-2 text-lg text-zinc-400">{tagline}</p>
          </div>
        </div>

        <p className="mt-5 text-md leading-9 text-zinc-400">
          {description}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={() => onSelect(persona)}
        className="
          hover:cursor-pointer
          mt-auto
          pt-3
          flex
          w-full
          items-center
          justify-between
          rounded-2xl
          border
          border-white/10
          bg-black/30
          px-6
          py-5
          text-lg
          font-semibold
          transition-all
          duration-200
          hover:translate-y-0.5
          hover:border-orange-500
        hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)]
        hover:from-[#171c29]
        hover:via-[#3c2310]
        hover:to-[#181b27]
          group-hover:bg-orange/5
          group-hover:border-orange/20
        "
      >
        Chat with {name.split(" ")[0]}
        <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default PersonaCard;