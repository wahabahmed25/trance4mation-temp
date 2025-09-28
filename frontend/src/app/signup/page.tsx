"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SubmitButton from "@/feature/signup/SubmitButton";
import InputField from "@/feature/signup/InputField";
import { signup } from "@/lib/api/ApiCalls";

const SignupPage = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    const { name, email, password } = inputValue;

    if (!name || !email || !password) {
      setError("All fields are required ❌");
      return;
    }

    try {
      const result = await signup(name, email, password);
      if (result.success) {
        setSuccess("Account created successfully ✅");
        setError("");
        setInputValue({ name: "", email: "", password: "" });

        router.push("/login")
      } else {
        setError("Error signing up ❌");
      }
    } catch (err) {
      setError("Unexpected error signing up ❌");
      console.error("error signing up", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d1b3d] to-[#0d1f2d] px-4 font-sans">
      <div className="bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-[#006D77]">
        <h1 className="text-3xl font-extrabold text-center text-[#FFD166] mb-6 tracking-wide">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="text"
            name="name"
            placeholder="Enter your name"
            value={inputValue.name}
            onChange={handleChange}
            className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-[#55CCF2] focus:ring-[#9B5DE5]"
          />
          <InputField
            type="email"
            name="email"
            placeholder="Enter your email"
            value={inputValue.email}
            onChange={handleChange}
            className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-[#55CCF2] focus:ring-[#9B5DE5]"
          />
          <InputField
            type="password"
            name="password"
            placeholder="Enter your password"
            value={inputValue.password}
            onChange={handleChange}
            className="bg-[#2a2a2a] text-white placeholder-gray-400 border border-[#55CCF2] focus:ring-[#9B5DE5]"
          />

          <SubmitButton
            label="Create Account"
            className="w-full py-3 rounded-xl bg-[#ff8661] text-black font-semibold hover:bg-[#9B5DE5] hover:text-white transition"
          />
        </form>

        {error && (
          <p className="text-red-400 mt-4 text-sm text-center font-medium">{error}</p>
        )}
        {success && (
          <p className="text-green-400 mt-4 text-sm text-center font-medium">{success}</p>
        )}

        <p className="mt-6 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#55CCF2] font-semibold hover:text-[#FFD166] transition"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
