"use client";
import AuthTransitionLayout from "@/user-signup/AuthTransitionLayout";
import { useEffect } from "react";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // get all linked stylesheets
    const linkedStyles = document.querySelectorAll('link[rel="stylesheet"]');

    // disable all sheets except the first, which contains the Tailwind CSS specific to this page
    for (let i = 0; i < linkedStyles.length; i++) {
      if (i === 0) {
        continue
      }
      linkedStyles[i].disabled = true
    }

    // Cleanup: Re-enable global styles when leaving this page
    return () => {
      for (let i = 0; i < linkedStyles.length; i++) {
        linkedStyles[i].disabled = false
      }
    };
  }, [])
  return (
    <AuthTransitionLayout>
      {children}
    </AuthTransitionLayout>
  );
}
