"use client";

import AuthTransitionLayout from "@/user-signup/AuthTransitionLayout";
import { useEffect } from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // get all linked stylesheets (correctly typed)
    const linkedStyles = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');

    // disable all sheets except the first
    linkedStyles.forEach((sheet, index) => {
      if (index !== 0) {
        sheet.disabled = true;
      }
    });

    // Cleanup: re-enable all stylesheets
    return () => {
      linkedStyles.forEach((sheet) => {
        sheet.disabled = false;
      });
    };
  }, []);

  return <AuthTransitionLayout>{children}</AuthTransitionLayout>;
}
