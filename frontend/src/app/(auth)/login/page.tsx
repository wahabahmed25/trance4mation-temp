"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SubmitButton from "@/user-signup/signup/SubmitButton";
import InputField from "@/user-signup/signup/InputField";
import { login } from "@/lib/api/ApiCalls";
import { initAnalytics } from "@/lib/firebase";
import AuthLayout from "@/user-signup/AuthLayout";
export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // useEffect(() => initAnalytics(), []);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { email, password } = values;
    if (!email || !password) return setError("All fields are required ❌");

    const result = await login(email, password);
    if (!result.success) return setError("Invalid email or password ❌");

    router.push("/home");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to continue your journey ✨"
      footerText="Don’t have an account?"
      footerLinkText="Create one"
      footerLinkHref="/signup"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <InputField
          type="email"
          name="email"
          placeholder="you@email.com"
          value={values.email}
          onChange={handleChange}
          className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white"
        />

        <InputField
          type="password"
          name="password"
          placeholder="Your password"
          value={values.password}
          onChange={handleChange}
          className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white"
        />

        <div className="mt-8">
          <SubmitButton
            label="Log In"
            className="rounded-full bg-gradient-to-r cursor-pointer from-[#ce0f0f] to-[#ba1702] text-white py-3"
          />
        </div>
      </form>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
    </AuthLayout>
  );
}
