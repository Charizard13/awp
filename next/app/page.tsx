"use client";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl/none">
                Welcome to Awp
              </h1>
              <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400">
                Transform any website into a PWA in seconds.
              </p>
            </div>
            <div className="space-x-2">
              <Button variant="default" asChild>
                <Link href="/demo">Try Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-100 dark:bg-zinc-800 ">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center items-center text-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-zinc-50 px-3 py-1 text-sm dark:bg-zinc-800">
                Key Features
              </div>
              <ul className="grid gap-2 py-4">
                <li className="flex gap-2">
                  <Check />
                  Seamless transformation of websites into PWAs.
                </li>
                <li className="flex gap-2 w-full">
                  <Check />
                  Quick and efficient process.
                </li>
                <li className="flex gap-2 w-full">
                  <Check />
                  No coding skills required.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col justify-center items-center text-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-800">
                Benefits
              </div>
              <ul className="grid gap-2 py-4">
                <li className="flex gap-2 w-full">
                  <Check />
                  Enhance user experience with PWA features.
                </li>
                <li className="flex gap-2 w-full">
                  <Check />
                  Improve website performance and speed.
                </li>
                <li className="flex gap-2 w-full">
                  <Check />
                  Increase engagement and conversion rates.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
