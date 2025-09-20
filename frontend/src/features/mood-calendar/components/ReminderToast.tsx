"use client";
import { useEffect, useState } from "react";

export function ReminderToast() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
// line 14 -> reminder box
  return (
    <div className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2">
      <div className="rounded-xl border bg-red-400 text-white px-4 py-2 shadow-lg">
        <span className="text-s">Don’t forget to log today’s mood 🫶🏻 </span>
        <button
          className="ml-3 rounded-lg border px-2 py-0.5 text-xs hover:bg-gray-50"
          onClick={() => setShow(false)}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}