"use client";

import React from "react";
import { Button } from "./button";
import type { LucideIcon } from "lucide-react";

type IconButtonProps = {
  Icon: LucideIcon;
  label: string;
  //   onClick: () => void;
};

export default function IconButton({ Icon, label }: IconButtonProps) {
  return (
    <Button
      //   onClick={onClick}
      className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
    >
      <Icon />
      <span className="sr-only">{label}</span>
    </Button>
  );
}
