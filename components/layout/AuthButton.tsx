"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function AuthButton() {
  const isLogged = useIsLogged();

  return (
    <Button
      className="text-gray-700 border-gray-700 hover:bg-gray-700 hover:text-white dark:text-gray-100 dark:border-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-700"
      variant="outline"
    >
      <Link href="/login">Login</Link>
    </Button>
  );
}
