//app/page.js
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 py-20">
      <header className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Duke Benson
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-400">
          CU Boulder Student · Building with code and AI
        </p>
      </header>

      <nav className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/ai-research"
          className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-cyan-500/30 transition-all"
        >
          🧠 AI Research Feed
        </Link>

        <Link
          href="/real-estate"
          className="px-8 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-lg hover:shadow-orange-500/30 transition-all"
        >
          🏢 Real Estate
        </Link>

        <Link
          href="/work"
          className="px-8 py-3 text-base font-semibold rounded-lg border-2 border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
        >
          Work
        </Link>

        <Link
          href="/about-me"
          className="px-8 py-3 text-base font-semibold rounded-lg border-2 border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
        >
          About Me
        </Link>
      </nav>

      <footer className="mt-24 text-center">
        <p className="text-gray-400 mb-4">Want to collaborate or have a project in mind?</p>
        <Link
          href="mailto:dukerenobenson@gmail.com"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-semibold hover:shadow-lg transition-all"
        >
          Get In Touch
        </Link>
      </footer>
    </div>
  );
}
