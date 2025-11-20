"use client";
import AuthTransitionLayout from "@/user-signup/AuthTransitionLayout";
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthTransitionLayout>
      {children}
    </AuthTransitionLayout>
  );
}
