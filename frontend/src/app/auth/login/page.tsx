"use client";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import SubmitButton from "@/user-signup/signup/SubmitButton";
import InputField from "@/user-signup/signup/InputField";
import { login } from "@/lib/api/ApiCalls";
import AuthLayout from "@/user-signup/AuthLayout";
import { useAuth } from "@/context/AuthContext";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { loginUser } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      setError("All fields are required ❌");
      return;
    }

    const result = await login(email, password);

    // FIX: only allow login if success AND user exists
    if (!result.success || !result.user) {
      setError("Invalid email or password ❌");
      return;
    }

    // Now TS knows result.user is DEFINITELY a User
    loginUser(result.user);

    router.push("/home");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Log in to continue your journey ✨"
      footerText="Don’t have an account?"
      footerLinkText="Create one"
      footerLinkHref="/auth/signup"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <InputField
          type="email"
          name="email"
          placeholder="you@email.com"
          value={values.email}
          onChange={handleChange}
          className="bg-white/10 border border-white/20 rounded-full px-5 py-4 text-white text-lg"
        />

        <InputField
          type="password"
          name="password"
          placeholder="Your password"
          value={values.password}
          onChange={handleChange}
          className="bg-white/10 border border-white/20 rounded-full px-5 py-4 text-white text-lg"
        />

        <div className="mt-8">
          <SubmitButton
            label="Log In"
            className="rounded-full bg-gradient-to-r cursor-pointer from-[#bf1212] to-[#c61b05] text-white py-4 text-lg"
          />
        </div>
      </form>

      {error && (
        <p className="text-red-400 text-sm text-center mt-3">{error}</p>
      )}
    </AuthLayout>
  );
}
