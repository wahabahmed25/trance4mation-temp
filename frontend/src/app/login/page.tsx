"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SubmitButton from "@/user-signup/signup/SubmitButton";
import InputField from "@/user-signup/signup/InputField";
import { login } from "@/lib/api/ApiCalls"; // ← adjust if your login API is named differently
import { initAnalytics } from "@/lib/firebase";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    initAnalytics();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = inputValue;

    if (!email || !password) {
      setError("All fields are required ❌");
      return;
    }

    try {
      const result = await login(email, password);
      if (result.success) {
        setSuccess("Logged in successfully ✅");
        setError("");
        router.push("/home");
      } else {
        setError("Invalid email or password ❌");
      }
    } catch (err) {
      setError("Unexpected error logging in ❌");
      console.error(err);
    }
  };

  return (
    <div className="font-sans flex justify-center items-center min-h-screen px-6 py-14 bg-gradient-to-br from-[#faf8ff] via-[#f3ecff] to-[#ffeaea]">
      <main className="w-full max-w-md bg-white/90 backdrop-blur-xl shadow-lg rounded-2xl px-8 py-10 border border-white/40">

        {/* Title */}
        <h1 className="text-center text-3xl font-bold text-[#4B4FA3] tracking-tight mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          Log in to continue your journey ✨
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <InputField
            type="email"
            name="email"
            placeholder="you@email.com"
            value={inputValue.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-lg focus:ring-2 focus:ring-[#B3A6FF] transition"
          />

          <InputField
            type="password"
            name="password"
            placeholder="Your password"
            value={inputValue.password}
            onChange={handleChange}
            className="w-full px-4 py-2.5 border border-slate-200 bg-white rounded-lg focus:ring-2 focus:ring-[#B3A6FF] transition"
          />

          <SubmitButton
            label="Log In"
            className="w-full py-3 rounded-lg font-semibold text-gray-900 bg-gradient-to-r from-[#c1adfe] via-[#e1befd] to-[#cec3f0] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          />
        </form>

        {/* Messages */}
        {error && <p className="text-orange-600 mt-3 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 mt-3 text-sm text-center">{success}</p>}

        {/* Switch to Signup */}
        <p className="mt-6 text-center text-sm text-gray-700">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#7E4FFF] hover:text-[#FF6F61] font-medium underline transition">
            Create one
          </Link>
        </p>
      </main>
    </div>
  );
}
