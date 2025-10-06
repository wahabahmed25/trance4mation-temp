"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { login } from "@/lib/api/ApiCalls";
import InputField from "@/user-signup/signup/InputField";
import LoginButton from "@/user-signup/login/LoginButton";
import { useAuth } from "@/context/AuthContext";


interface loginForm {
  email: string;
  password: string;
}


const page = () => {
    const router = useRouter();
  const [inputValue, setInputValue] = useState<loginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { loginUser } = useAuth();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
      setError("");
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
      console.log("these are results", result);
      if (result.success && result.user){
        loginUser(result.user);
        router.push('/home')
        console.log("user: ", result.user)
        console.log("successfully logged in")
      }
      else{
        setError("error logging in, please try again")
      }

    } catch (err) {
        setError('error loggin in, please try again')
        console.error("error login:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2d1b3d] to-[#0d1f2d] px-4 font-sans">
      <div className="bg-[#1e1e1e] rounded-2xl shadow-2xl p-8 w-full max-w-md border border-[#006D77]">
        <h1 className="text-3xl font-extrabold text-center text-[#FFD166] mb-6 tracking-wide">
          Log In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
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

        <LoginButton
            label="Login"
            className="w-full py-3 rounded-xl bg-[#ff8661] text-black font-semibold hover:bg-[#9B5DE5] hover:text-white transition"
          />
          
        </form>

        {error && (
          <p className="text-red-400 mt-4 text-sm text-center font-medium">{error}</p>
        )}
        

        <p className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#55CCF2] font-semibold hover:text-[#FFD166] transition"
          >
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
};

export default page;
