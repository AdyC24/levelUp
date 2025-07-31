import React from "react";

export function Button({ children, className = "", disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}
