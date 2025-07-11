import React from "react";
import GenreList from "./GenreList";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-purple-900 text-white py-16 px-4 overflow-hidden mt-16">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
          🎥 All the Movies You Love, One Click Away
        </h1>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Access a world of movies and shows — no limits, no waiting. Watch
          anywhere, anytime.
        </p>

        <div className="inline-block bg-white/10 backdrop-blur-sm rounded-xl py-4 px-6 shadow-lg hover:bg-white/20 transition-all duration-300">
          <GenreList />
        </div>
      </div>
    </section>
  );
};

export default Hero;
