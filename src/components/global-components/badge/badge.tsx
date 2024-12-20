import React from "react";

type BadgeProps = {
  text: string;
  type: "primary" | "secondary";
  size: "xs" | "sm" | "md" | "lg";
  color: "blue" | "gray" | "green" | "red" | "yellow" | "white" | "skyblue";
};

const Badge: React.FC<BadgeProps> = ({ text, color, size, type }) => {
  const colorClasses = {
    blue: "text-blue-500 border-blue-500 bg-blue-500",
    gray: "text-gray-500 border-gray-500 bg-gray-500",
    green: "text-green-700 border-green-700 bg-green-700",
    red: "text-red-600 border-red-600 bg-red-600",
    yellow: "text-amber-500 border-amber-500 bg-amber-500",
    white: "text-slate-50 border-slate-50 bg-slate-50",
    skyblue: "text-sky-700 border-sky-700 bg-sky-700",
  };

  const sizeClasses = {
    xs: "text-xs py-0.5 px-1.5",
    sm: "text-sm py-1 px-2.5",
    md: "text-md py-1.5 px-3.5",
    lg: "text-lg py-2 px-4.5",
  };

  const baseClasses = "font-semibold rounded-full";

  const isSecondary = type === "secondary";

  const colorClass = isSecondary
    ? `${colorClasses[color].replace(/bg-\S+/g, "")} border`
    : `${colorClasses[color].replace(/text-\S+/g, "text-white")}`;

  const sizeClass = sizeClasses[size];

  return (
    <span className={`${baseClasses} ${colorClass} ${sizeClass}`}>{text}</span>
  );
};

export default Badge;
