import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashBoardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <Button asChild>
        <Link href="/dashboard/metadata">App Metadata</Link>
      </Button>
    </div>
  );
}
