"use client";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export default function SubmitButton({ children, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button className="flex items-center justify-center" {...props} type="submit">
      {pending ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
}
