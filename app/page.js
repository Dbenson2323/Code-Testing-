//app/page.js
"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [portfolioHovered, setPortfolioHovered] = useState(false);
  const [projectsHovered, setProjectsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center">
      {/* Hero Section */}
      <header className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide animate-pulse">
          Duke Benson
        </h1>
        <p className="text-xl md:text-2xl text-gray-400">
          CU Boulder Student | Nuggets | Future Innovator
        </p>
      </header>

      {/* Portfolio Button */}
      <Link
        href="/portfolio"
        className={`mt-8 px-8 py-3 text-lg font-semibold border-2 rounded-lg transition-all ${
          portfolioHovered
            ? "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 border-transparent text-white"
            : "bg-transparent border-gray-700 text-gray-400 hover:text-white"
        }`}
        onMouseEnter={() => setPortfolioHovered(true)}
        onMouseLeave={() => setPortfolioHovered(false)}
      >
        View My Portfolio
      </Link>

      {/* Sports & Campus Life Section */}
      <section className="mt-16 space-y-8 max-w-4xl text-center">
        <h2 className="text-4xl font-semibold">Sports & Campus Life</h2>
        <p className="text-gray-400 text-lg">
          As a CU Boulder student, I&apos;m passionate about sports, fitness, and staying active while balancing academic life.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          {[
            { activity: "Basketball", icon: "🏀" },
            { activity: "Hiking", icon: "🥾" },
            { activity: "Cycling", icon: "🚴" },
            { activity: "Gym Workouts", icon: "🏋️‍♂️" },
          ].map(({ activity, icon }) => (
            <div
              key={activity}
              className="p-4 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
            >
              <div className="text-3xl mb-2">{icon}</div>
              <p className="font-medium">{activity}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Button */}
      <Link
        href="/projects"
        className={`mt-8 px-8 py-3 text-lg font-semibold border-2 rounded-lg transition-all ${
          projectsHovered
            ? "bg-gradient-to-r from-green-500 via-yellow-500 to-orange-500 border-transparent text-white"
            : "bg-transparent border-gray-700 text-gray-400 hover:text-white"
        }`}
        onMouseEnter={() => setProjectsHovered(true)}
        onMouseLeave={() => setProjectsHovered(false)}
      >
        Explore My Projects
      </Link>

      {/* Contact Section */}
      <footer className="mt-24 text-center">
        <p className="text-gray-400 mb-4">Want to collaborate or have a project in mind?</p>
        <Link
          href="mailto:dukebenson@example.com"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-semibold hover:shadow-lg transition-all"
        >
          Get In Touch
        </Link>
      </footer>
    </div>
  );
}
