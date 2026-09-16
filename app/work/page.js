// app/work/page.js
import Link from "next/link";

export const metadata = {
  title: "Work — Duke Benson",
  description: "Projects Duke Benson has built.",
};

const projects = [
  {
    name: "AI Research Feed",
    description:
      "A daily-updated feed of AI research and industry news, pulled from arXiv, Hacker News, and official lab blogs, with automated factual-accuracy and writing-quality scoring on every story.",
    href: "/ai-research",
    linkLabel: "View the feed →",
  },
];

export default function WorkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-16 max-w-3xl">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Work</h1>
          <p className="text-gray-400 text-lg">A few things I&apos;ve built.</p>
        </header>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.name}
              className="p-6 bg-gray-800/60 border border-gray-700 rounded-xl"
            >
              <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">{project.description}</p>
              <Link href={project.href} className="text-cyan-400 hover:text-cyan-300 font-medium">
                {project.linkLabel}
              </Link>
            </div>
          ))}

          <p className="text-center text-gray-500 text-sm pt-4">
            More projects coming soon.
          </p>
        </div>

        <footer className="mt-16 text-center">
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Back to Home
          </Link>
        </footer>
      </div>
    </div>
  );
}
