"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SubmitButton from "@/user-signup/signup/SubmitButton";
import InputField from "@/user-signup/signup/InputField";
import { signup } from "@/lib/api/ApiCalls";
import { initAnalytics } from "@/lib/firebase";
import AuthLayout from "@/user-signup/AuthLayout";
export default function SignupPage() {
  const router = useRouter();
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  // useEffect(() => initAnalytics(), []);

  const handleChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { name, email, password } = values;

    if (!name || !email || !password) return setError("All fields are required ❌");

    const result = await signup(name, email, password);

    if (!result.success) return setError("Signup failed ❌");

    router.push("/login");
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Begin something beautiful"
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <InputField
          type="text"
          name="name"
          placeholder="Full Name"
          value={values.name}
          onChange={handleChange}
          className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white"
        />

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
          placeholder="Create a password"
          value={values.password}
          onChange={handleChange}
          className="bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white"
        />

        <SubmitButton
          label="Create Account"
          className="rounded-full bg-gradient-to-r from-[#FF512F] to-[#F09819] text-white py-3"
        />
      </form>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
    </AuthLayout>
  );
}
