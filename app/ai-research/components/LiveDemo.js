"use client";

import { useState } from "react";

// Click-to-load embed for a third-party agent replay/demo. Loaded on click
// rather than automatically, since it's an external page outside our
// control — some sites refuse to be framed at all, so this also always
// shows a direct link as a fallback rather than only a (possibly blank) frame.
export default function LiveDemo({ demo }) {
  const [expanded, setExpanded] = useState(false);

  if (!demo) return null;

  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-sm font-semibold text-gray-900">
            ▶ Watch: {demo.label}
          </span>
          <span className="text-xs text-gray-400 ml-auto">via {demo.provider}</span>
        </button>
      ) : (
        <div>
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 text-white text-xs">
            <span className="font-semibold">{demo.label} · via {demo.provider}</span>
            <button onClick={() => setExpanded(false)} className="text-gray-300 hover:text-white">
              Close ✕
            </button>
          </div>
          <iframe
            src={demo.url}
            title={demo.label}
            className="w-full h-[520px] bg-white"
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
          />
          <div className="px-4 py-2 text-xs text-gray-500 bg-white border-t border-gray-100">
            Not loading? {" "}
            <a
              href={demo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gray-900"
            >
              Open the replay directly ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
