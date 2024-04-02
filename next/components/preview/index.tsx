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
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import { Link2Icon } from "lucide-react";
import Footer from "./Footer";
import Links from "./Links";

type PreviewProps = {
  brand: Tables<"brands"> & {
    logoUrl: string;
    links: Tables<"links">[];
  };
  isPreviewMode: boolean;
};
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function Preview({ brand, isPreviewMode }: PreviewProps) {
  const { logoUrl, name, description, url } = brand;
  return (
    <Card className="flex aspect-[9/16] min-w-[400px] flex-col items-center p-4 text-center xl:shadow-md">
      <CardHeader>
        <Image
          src={logoUrl}
          alt="Brand Icon"
          height={128}
          width={128}
          className="m-auto rounded-full border-2 border-inherit  max-w-[128px] max-h-[128px]"
        />
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription className="whitespace-pre-wrap">
          {description}
        </CardDescription>
        <CardDescription>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Personal Website <Link2Icon className="inline-block h-4 w-4" />
          </a>
        </CardDescription>
        <Links links={brand.links} />
      </CardContent>
      {!isPreviewMode && <Footer brandUrl={`${defaultUrl}/${brand.name}`} />}
    </Card>
  );
}
