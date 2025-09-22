"use client";

import React from "react";
import { useState } from "react";
import SubmitButton from "@/feature/signup/SubmitButton";
import InputField from "@/feature/signup/InputField";
const page = () => {
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

  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <div className="w-full h-full bg-black bg-cover">
      <form onSubmit={handleSubmit}>
        <InputField
          type="name"
          name="name"
          placeholder="enter your name"
          value={inputValue.name}
          onChange={handleChange}
        />
        <InputField
          type="email"
          name="email"
          placeholder="enter your email"
          value={inputValue.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="enter your password"
          value={inputValue.password}
          onChange={handleChange}
        />

        <SubmitButton label="Create Account" />
      </form>
      {error && (
        <p className="text-red-500 mt-2 text-sm sm:text-base">{error}</p>
      )}
      {success && (
        <p className="text-green-400 mt-2 text-sm sm:text-base">{success}</p>
      )}
    </div>
  );
};

export default page;
