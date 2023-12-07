"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <Card className="flex flex-col items-center justify-center w-full max-w-lg h-full m-auto">
      <CardHeader>
        <h1 className="text-4xl font-bold">Could not find your app</h1>
      </CardHeader>
      <CardContent>
        <p className="text-xl">There was an error getting your app metadata.</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/dashboard/apps">Visit Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
