import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

// A fixed, darker, more vivid background photo. Contrast for the text
// comes from a dark radial vignette centered where the text sits — not a
// white wash — so the photo stays vivid and visible toward the edges and
// only dims right behind the text itself. Fixed positioning means it
// stays put while the page content scrolls over it.
export default function PhotoBackdrop() {
  return (
    <div className="fixed inset-0 h-screen overflow-hidden bg-black">
      <Image
        src={`${basePath}/glacier-national-park-river-falls-nature-landscapes-2627b2.jpg`}
        alt="Glacier National Park river falls"
        fill
        priority
        className="object-cover brightness-[0.7] contrast-[1.1]"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 28%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 78%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-white" />
    </div>
  );
}
