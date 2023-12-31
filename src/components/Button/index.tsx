"use client";

import { ReactNode, RefObject } from "react";

interface ButtonProps {
  children: ReactNode;
  color: "yellow" | "blue";
  width: string;
  onClick: () => void;
  ref?: RefObject<HTMLInputElement>;
}

const colors = {
  yellow: ["bg-yellow-1", "border-yellow-2"],
  blue: ["bg-blue-1", "border-blue-2"],
};

export default function Button({
  children,
  color,
  width,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`font-manrope font-bold text-white ${colors[color][0]} border-b-4 ${colors[color][1]} ${width} py-4 text-xl rounded-2xl transition duration-500 hover:opacity-95`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
