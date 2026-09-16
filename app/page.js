//app/page.js
import Link from "next/link";
import MountainBackdrop from "./components/MountainBackdrop";
import EducationRow from "./components/EducationRow";
import SocialLink from "./components/SocialLink";
import { MailIcon, LinkedInIcon, InstagramIcon, XIcon } from "./components/ProfileIcons";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <MountainBackdrop />

      <div className="relative px-6 py-20 max-w-2xl mx-auto">
        <header className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">Duke Benson</h1>
          <p className="mt-3 text-lg text-gray-500">Denver, Colorado</p>
        </header>

        {/* Education */}
        <section className="mt-12 space-y-3">
          <EducationRow
            href="https://www.colorado.edu/business/"
            iconBg="#000000"
            iconColor="#CFB87C"
            title="University of Colorado Boulder — Leeds School of Business"
            subtitle="Class of 2026 · Finance & Real Estate"
            bio="Studying finance and real estate at CU Boulder's Leeds School of Business."
          />
          <EducationRow
            href="https://www.kentdenver.org/"
            iconBg="#F3F4F6"
            iconColor="#374151"
            title="Kent Denver School"
            subtitle="Class of 2022"
            bio="Graduated from Kent Denver School in Denver, Colorado."
          />
        </section>

        {/* Site nav */}
        <nav className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href="/ai-research"
            className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white shadow-md hover:shadow-cyan-500/30 transition-all"
          >
            🧠 AI Research Feed
          </Link>
          <Link
            href="/real-estate"
            className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white shadow-md hover:shadow-orange-500/30 transition-all"
          >
            🏢 Real Estate
          </Link>
          <Link
            href="/work"
            className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-gray-300 text-gray-700 hover:border-gray-500 transition-colors"
          >
            Work
          </Link>
          <Link
            href="/about-me"
            className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-gray-300 text-gray-700 hover:border-gray-500 transition-colors"
          >
            About Me
          </Link>
        </nav>

        {/* Contact */}
        <section className="mt-16 text-center">
          <p className="text-gray-500 mb-4">Let&apos;s connect</p>
          <div className="flex flex-wrap justify-center gap-3">
            <SocialLink href="mailto:dukerenobenson@gmail.com" icon={<MailIcon className="w-4 h-4" />} label="Email" />
            <SocialLink href="https://www.linkedin.com/in/dukebenson/" icon={<LinkedInIcon className="w-4 h-4 rounded" />} label="LinkedIn" />
            <SocialLink href="https://www.instagram.com/dukebenson_/" icon={<InstagramIcon className="w-4 h-4" />} label="Instagram" />
            <SocialLink href={null} icon={<XIcon className="w-4 h-4" />} label="Twitter/X" />
          </div>
        </section>
      </div>
    </div>
  );
}
