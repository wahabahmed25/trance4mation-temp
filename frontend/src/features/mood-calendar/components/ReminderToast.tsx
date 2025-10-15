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
    <div className="fixed bottom-6 right-6 rounded-2xl px-5 py-3 shadow-lg border border-[#FCA17D]/40 backdrop-blur-md text-white text-sm font-medium"
      style={{
        background: "linear-gradient(135deg, #FCA17D 0%, #F6765E 100%)",
        boxShadow: "0 6px 20px rgba(246,118,94,0.4)",
      }}
    >
       Don’t forget to log your mood today!
    </div>
  );
}
