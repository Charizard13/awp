import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Button asChild className="w-full max-w-lg">
        <Link href="/dashboard/metadata">App Metadata</Link>
      </Button>
    </div>
  );
}
