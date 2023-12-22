"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables } from "@/types";
import { Link2Icon } from "lucide-react";
import Footer from "./Footer";
import Links from "./Links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const capitalShortName = name.slice(0, 2).toUpperCase();
  return (
    <Card className="flex aspect-[9/16] min-w-[400px] flex-col items-center p-4 text-center xl:shadow-md">
      <CardHeader>
        <Avatar className="size-32 border-2 border-inherit">
          <AvatarImage src={logoUrl} alt="Brand Icon" />
          <AvatarFallback>{capitalShortName}</AvatarFallback>
        </Avatar>
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
