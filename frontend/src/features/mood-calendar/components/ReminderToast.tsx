"use client";
import { useEffect, useState } from "react";

export function ReminderToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:bottom-6 sm:right-6 sm:left-auto sm:w-auto">
      <div className="mx-2 sm:mx-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white shadow-[0_0_15px_rgba(255,255,255,0.15)] backdrop-blur-md">
        Don’t forget to log today’s mood 😊
        <button
          className="ml-3 rounded-lg border border-white/20 px-2 py-0.5 text-xs text-white/80 hover:bg-white/10 transition"
          onClick={() => setShow(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
