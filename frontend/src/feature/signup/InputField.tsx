import React from 'react'


interface propType {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputField = ({ type, name, placeholder, value, onChange }: propType) => {
  return (
    <div className="flex justify-center w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full max-w-md px-4 py-3 rounded-lg border border-gray-400 
                   focus:ring-2 focus:ring-purple-600 focus:border-purple-600 
                   outline-none shadow-md transition duration-200 text-gray-200
                   placeholder-gray-500 flex-1`}
      />
    </div>
  )
}

export default InputField
