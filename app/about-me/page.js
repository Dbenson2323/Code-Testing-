// app/about-me/page.js

"use client";

import Link from "next/link";

export default function AboutMe() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            About Me
          </h1>
          <p className="text-gray-400 text-lg">
            A glimpse into who I am and what drives me.
          </p>
        </header>

        {/* Introduction Section */}
        <section className="mt-12 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-400">Who I Am</h2>
            <p className="text-gray-300 leading-relaxed">
              Hi, I&apos;m <span className="font-bold">Duke Benson</span>, a passionate developer and creative thinker based in Colorado, USA. 
              With a knack for building cutting-edge applications and crafting intuitive user experiences, I thrive in the dynamic intersection of technology and design.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-blue-400">My Journey</h2>
            <p className="text-gray-300 leading-relaxed">
              My journey in technology started with curiosity and a drive to create. From tinkering with code in high school to building scalable applications today, 
              I&apos;ve always sought to challenge myself and learn continuously. I&apos;m currently expanding my expertise in modern frameworks like <span className="font-bold">Next.js</span> 
              and <span className="font-bold">React</span>, alongside exploring the possibilities of AI and immersive user interfaces.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-blue-400 text-center mb-6">
            My Core Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { skill: "JavaScript", icon: "🟨" },
              { skill: "React", icon: "⚛️" },
              { skill: "Next.js", icon: "🌐" },
              { skill: "Tailwind CSS", icon: "🎨" },
              { skill: "UI/UX Design", icon: "🎥" },
              { skill: "Node.js", icon: "🌱" },
            ].map(({ skill, icon }) => (
              <div
                key={skill}
                className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              >
                <div className="text-4xl">{icon}</div>
                <p className="mt-2 font-medium">{skill}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Interests Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-semibold text-blue-400 text-center mb-6">
            What I Love
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto">
            Beyond coding, I enjoy exploring new technologies, playing video games, 
            hiking the breathtaking trails of Colorado, and indulging in my passion for photography. 
            I believe that creativity extends beyond the keyboard and into every aspect of life.
          </p>
        </section>

        {/* Call to Action */}
        <footer className="mt-16 text-center">
          <Link href="/">
            <a className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
              Back to Home
            </a>
          </Link>
        </footer>
      </div>
    </div>
  );
}
