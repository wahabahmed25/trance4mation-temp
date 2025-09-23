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
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:bottom-4 sm:right-4 sm:left-auto sm:w-auto">
      <div className="mx-2 sm:mx-0 rounded-xl bg-brand-peach px-4 py-3 text-sm font-medium text-white shadow-lg">
        Don’t forget to log today’s mood 😊
        <button
          className="ml-3 rounded-lg border border-white/30 px-2 py-0.5 text-xs text-white hover:bg-white/20"
          onClick={() => setShow(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}