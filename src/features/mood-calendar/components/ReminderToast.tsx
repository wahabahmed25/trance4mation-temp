"use client";
import { useEffect, useState } from "react";

export function ReminderToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 2000);
    const hide = setTimeout(() => setVisible(false), 8000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 rounded-2xl px-5 py-3 shadow-lg border border-[#CFE6FF]/60 backdrop-blur-md text-[#1E1E1E] text-sm font-medium"
      style={{
        background: "linear-gradient(135deg, #FFFFFF 0%, #EAF3FF 100%)",
        boxShadow: "0 6px 20px rgba(150,180,220,0.3)",
      }}
    >
      Don’t forget to log your mood today!
    </div>
  );
}
