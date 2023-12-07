"use client";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { useEffect, useState, useId } from "react";

type SubmitButtonProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export default function SubmitButton({
  children,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  const id = useId();
  const [childrenWidth, setChildrenWidth] = useState(0);

  useEffect(() => {
    if (!pending) {
      const buttonElement = document.getElementById(id);
      if (!buttonElement) return;
      const childrenWidth = buttonElement.offsetWidth;
      setChildrenWidth(childrenWidth);
    }
  }, [pending, id]);

  return (
    <Button
      className="flex items-center justify-center"
      {...props}
      type="submit"
      id={id}
      style={{ minWidth: childrenWidth }}
    >
      {pending ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
}
