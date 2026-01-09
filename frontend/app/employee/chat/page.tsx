"use client";

import { Suspense } from "react";
import ChatContent from "./ChatContent";

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#72deff] to-[#0084b4]">Loading chat interface...</div>}>
      <ChatContent />
    </Suspense>
  );
}
