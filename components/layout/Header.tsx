import Link from "next/link";
import AuthButton from "../AuthButton";
import { Button } from "@/components/ui/button";
import { CloudIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 h-16 shadow-sm">
      <Link className="flex items-center" href={"/"}>
        <CloudIcon />
        <h1 className="ml-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Awp</h1>
      </Link>
      <Button className="hidden md:block" asChild variant="ghost">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <AuthButton />
    </header>
  );
}
