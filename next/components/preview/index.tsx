"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables } from "@/types";
import Image from "next/image";

type PreviewProps = {
  brand: Tables<"brands"> & {
    iconUrl: string;
  };
};

export default function Preview({ brand }: PreviewProps) {
  const { iconUrl, name, description, url } = brand;
  return (
    <Card className="flex w-full max-w-screen-sm flex-grow flex-col items-center self-auto text-center xl:shadow-md">
      <CardHeader>
        <Image
          src={iconUrl}
          alt="App Icon"
          height={128}
          width={128}
          className="m-auto rounded-full object-contain"
        />
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4"></CardContent>
      <CardDescription>{description}</CardDescription>
      {/* <AppCardFooter app={brand} /> */}
    </Card>
  );
}
