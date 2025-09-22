import React from 'react'

interface propType {
    className?: string;
    label?: string;
}

const SubmitButton = ({className = "", label}: propType) => {
  return (
     <button
      type="submit"
      className={`w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl 
                  shadow-md hover:bg-blue-700 transition duration-200 
                  focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    >
      {label}
    </button>
  )
}

export default SubmitButton
