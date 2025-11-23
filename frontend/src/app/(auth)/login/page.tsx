"use client";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import SubmitButton from "@/user-signup/signup/SubmitButton";
import InputField from "@/user-signup/signup/InputField";
import { login } from "@/lib/api/ApiCalls";
// import { initAnalytics } from "@/lib/firebase";
import AuthLayout from "@/user-signup/AuthLayout";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "" });
  const [error, setError] = useState("");

  // useEffect(() => initAnalytics(), []);

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
    if (!result.success) {
      setError("Invalid email or password ❌");
      return;
    }

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
<<<<<<< HEAD
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
=======
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
>>>>>>> dev
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
