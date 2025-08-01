import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {children}
    </div>
  );
}
