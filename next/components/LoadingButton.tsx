"use client";

import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

type LoadingButtonProps = {
  children: React.ReactNode;
  isPending: boolean;
  [key: string]: unknown;
};

export default function LoadingButton({ children, isPending, ...props }: LoadingButtonProps) {
  return (
    <Button className="flex items-center justify-center" {...props}>
      {isPending ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
}
