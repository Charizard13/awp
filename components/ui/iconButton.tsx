"use client";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  icon: keyof typeof dynamicIconImports;
  onClick: () => void;
}

export const IconButton = ({ icon, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[icon]);

  return (
    <LucideIcon
      className="hover:text-gray-300
  transition-colors duration-200 ease-in-out cursor-pointer
  hover:bg-gray-700 rounded-md p-1
  "
      {...props}
      width={32}
      height={32}
      aria-label={icon}
    />
  );
};
