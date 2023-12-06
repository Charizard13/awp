"use client";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <Card className="flex flex-col items-center justify-center w-full max-w-lg h-full m-auto">
      <CardHeader>
        <h1 className="text-4xl font-bold">Error</h1>
      </CardHeader>
      <CardContent>
        <p>Something went wrong</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/dashboard/apps">Retry</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
