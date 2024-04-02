"use client";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useId } from "react";

type LoadingButtonProps =
  | {
      children: React.ReactNode;
      isLoading: boolean;
      onClick: () => void;
      [key: string]: unknown;
    }
  | {
      children: React.ReactNode;
      type: "submit";
      isLoading: boolean;
      [key: string]: unknown;
    };

export default function LoadingButton({
  children,
  isLoading,
  ...props
}: LoadingButtonProps) {
  const id = useId();
  const [childrenWidth, setChildrenWidth] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      const buttonElement = document.getElementById(id);
      if (!buttonElement) return;
      const childrenWidth = buttonElement.offsetWidth;
      setChildrenWidth(childrenWidth);
    }
  }, [isLoading, id]);

  return (
    <Button
      className="flex items-center justify-center"
      {...props}
      type="submit"
      id={id}
      style={{ minWidth: childrenWidth }}
    >
      {isLoading ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
}
