"use client";

import { useState } from "react";

const TAWK_CHAT_URL =
  "https://tawk.to/chat/69a13c924afa321c34c793e9/1jiet97hl";

export default function ChatPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="-m-6 flex flex-col overflow-hidden"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {!loaded && (
        <div className="flex-1 flex items-center justify-center bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-slate-800" />
            <p className="text-sm text-slate-400">Loading chat...</p>
          </div>
        </div>
      )}
      <iframe
        src={TAWK_CHAT_URL}
        onLoad={() => setLoaded(true)}
        className={`w-full border-0 ${loaded ? "flex-1" : "h-0"}`}
        allow="microphone; camera"
        title="Live Chat"
      />
    </div>
  );
}
