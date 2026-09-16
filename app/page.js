//app/page.js
import Link from "next/link";
import Image from "next/image";
import EducationRow from "./components/EducationRow";
import SocialLink from "./components/SocialLink";
import { MailIcon, LinkedInIcon, InstagramIcon, XIcon } from "./components/ProfileIcons";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      {/* Hero photo */}
      <div className="relative w-full h-72 md:h-96 overflow-hidden bg-black">
        <Image
          src={`${basePath}/glacier-national-park-river-falls-nature-landscapes-2627b2.jpg`}
          alt="Glacier National Park river falls"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 pb-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow">
            Duke Benson
          </h1>
        </div>
        <p className="absolute bottom-1.5 right-3 text-[10px] text-white/70">
          Photo: Glacier National Park, via{" "}
          <a
            href="https://picryl.com/media/glacier-national-park-river-falls-nature-landscapes-2627b2"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Picryl
          </a>
        </p>
      </div>

      <div className="relative px-6 py-14 max-w-2xl mx-auto">
        <header className="text-center">
          <p className="text-lg text-gray-500">Denver, Colorado</p>
          <p className="mt-5 text-gray-600 leading-relaxed max-w-lg mx-auto">
            Studying Finance &amp; Real Estate at the University of Colorado Boulder&apos;s Leeds
            School of Business. I build software that combines both interests — from an
            AI research feed to a live commercial real estate market dashboard.
          </p>
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

        {/* Currently building */}
        <section className="mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
            Currently Building
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/ai-research"
              className="block rounded-xl p-5 bg-gray-900 text-white shadow-md hover:bg-black transition-colors"
            >
              <span className="text-2xl grayscale">🧠</span>
              <h2 className="mt-2 font-bold">AI Research Feed</h2>
              <p className="mt-1 text-sm text-gray-300 leading-relaxed">
                A daily-updated feed of AI research and industry news, scored automatically for
                factual accuracy and writing quality.
              </p>
              <span className="mt-3 inline-block text-sm font-semibold border-b border-white/60">Explore →</span>
            </Link>

            <Link
              href="/real-estate"
              className="block rounded-xl p-5 bg-gray-900 text-white shadow-md hover:bg-black transition-colors"
            >
              <span className="text-2xl grayscale">🏢</span>
              <h2 className="mt-2 font-bold">Real Estate Dashboard</h2>
              <p className="mt-1 text-sm text-gray-300 leading-relaxed">
                Real interest rates from the Federal Reserve, live deal news, and market metrics
                across four focus markets.
              </p>
              <span className="mt-3 inline-block text-sm font-semibold border-b border-white/60">Explore →</span>
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/work"
              className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              All Work
            </Link>
            <Link
              href="/about-me"
              className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors"
            >
              About Me
            </Link>
          </div>
        </section>

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
