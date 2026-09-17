// app/about-me/page.js
import Link from "next/link";
import PhotoBackdrop from "../components/PhotoBackdrop";

export default function AboutMe() {
  return (
    <div className="relative min-h-screen bg-white text-gray-900">
      <PhotoBackdrop />

      <div className="relative px-6 pt-20 pb-14 max-w-2xl mx-auto text-center">
        <Link href="/" className="text-sm text-white/70 hover:text-white drop-shadow">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
