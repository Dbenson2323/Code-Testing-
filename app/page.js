//app/page.js
import Link from "next/link";
import PhotoBackdrop from "./components/PhotoBackdrop";
import EducationRow from "./components/EducationRow";
import SocialLink from "./components/SocialLink";
import { MailIcon, LinkedInIcon, InstagramIcon, XIcon } from "./components/ProfileIcons";

export default function HomePage() {
  return (
    <div className="relative min-h-screen text-white">
      <PhotoBackdrop />

      {/* Hero text, floating directly over the background photo */}
      <div className="relative px-6 pt-20 pb-8 max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
          Duke Benson
        </h1>
        <p className="mt-3 text-lg text-white/80 drop-shadow">Denver, Colorado</p>
        <p className="mt-5 text-white/90 leading-relaxed max-w-lg mx-auto drop-shadow">
          Studying Finance &amp; Real Estate at the University of Colorado Boulder&apos;s Leeds
          School of Business. I build software that combines both interests — from an
          AI research feed to a live commercial real estate market dashboard.
        </p>
        <p className="mt-6 text-[8px] text-white/50">
          Background photo: Glacier National Park, via{" "}
          <a
            href="https://picryl.com/media/glacier-national-park-river-falls-nature-landscapes-2627b2"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/80"
          >
            Picryl
          </a>
        </p>
      </div>

      <div className="relative px-6 pb-14 max-w-2xl mx-auto">
        {/* Education */}
        <section className="mt-12 space-y-3">
          <EducationRow
            href="https://www.colorado.edu/business/"
            iconBg="#000000"
            logoSrc="/logos/cu-boulder-icon.svg"
            title="University of Colorado Boulder — Leeds School of Business"
            subtitle="Class of 2026 · Finance & Real Estate"
            bio="Studying finance and real estate at CU Boulder's Leeds School of Business."
          />
          <EducationRow
            href="https://www.kentdenver.org/"
            iconBg="#F3F4F6"
            logoSrc="/logos/kent-denver-logo.jpeg"
            title="Kent Denver School"
            subtitle="Class of 2022"
            bio="Graduated from Kent Denver School in Denver, Colorado."
          />
        </section>

        {/* Currently building */}
        <section className="mt-14">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-white/70 drop-shadow mb-4">
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

            <div className="rounded-xl p-5 bg-gray-900 text-white shadow-md sm:col-span-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/riskwhale-icon.jpg" alt="RiskWhale" className="w-8 h-8 rounded-full" />
              <h2 className="mt-2 font-bold">RiskWhale</h2>
              <p className="mt-1 text-sm text-gray-300 leading-relaxed">
                Comprehensive risk analytics for financial markets — pattern matching across
                thousands of symbols, SEC forensic analysis, and an AI terminal built for
                institutional-grade risk intelligence.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold">
                <a
                  href="https://www.riskwhale.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-white/60 hover:text-gray-300"
                >
                  Explore →
                </a>
                <a
                  href="https://x.com/riskwhale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-white/60 hover:text-gray-300"
                >
                  Follow on X →
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <Link
              href="/work"
              className="px-2 py-2 text-sm font-semibold text-white hover:text-white/70 underline underline-offset-4 transition-colors drop-shadow"
            >
              All Work
            </Link>
            <Link
              href="/about-me"
              className="px-2 py-2 text-sm font-semibold text-white hover:text-white/70 underline underline-offset-4 transition-colors drop-shadow"
            >
              About Me
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16 text-center">
          <p className="text-white/70 drop-shadow mb-4">Let&apos;s connect</p>
          <div className="flex flex-wrap justify-center gap-3">
            <SocialLink href="mailto:info@drbenson.online" icon={<MailIcon className="w-4 h-4" />} label="Email" />
            <SocialLink href="https://www.linkedin.com/in/dukebenson/" icon={<LinkedInIcon className="w-4 h-4 rounded" />} label="LinkedIn" />
            <SocialLink href="https://www.instagram.com/dukebenson_/" icon={<InstagramIcon className="w-4 h-4" />} label="Instagram" />
            <SocialLink href={null} icon={<XIcon className="w-4 h-4" />} label="Twitter/X" />
          </div>
        </section>
      </div>
    </div>
  );
}
