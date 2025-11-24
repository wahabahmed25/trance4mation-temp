"use client";
import React from "react";

interface propType {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({ className = "", type, name, placeholder, value, onChange }: propType) => {
  return (
    <div className="flex justify-center w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full max-w-lg px-5 py-4
                    text-lg 
                    rounded-xl 
                    border border-gray-400 
                    focus:ring-2  
                    outline-none shadow-md 
                    transition duration-200 
                    text-gray-200 placeholder-gray-350 
                    flex-1 
                    ${className}`}
      />
    </div>
  );
};

export default InputField;
