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
    <Card className="m-auto flex h-full w-full max-w-lg flex-col items-center justify-center">
      <CardHeader>
        <h1 className="text-4xl font-bold">Could not find your app</h1>
      </CardHeader>
      <CardContent>
        <p className="text-xl">There was an error getting your app metadata.</p>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href="/brands">Visit Dashboard</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
