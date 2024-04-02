"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables, TablesInsert, TablesUpdate } from "@/types";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import Link from "next/link";
import { Link2Icon } from "lucide-react";
import Footer from "./Footer";
import Links from "./Links";
import { linkType } from "@/lib/consts";

type PreviewProps = {
  brand: TablesUpdate<"brands"> & {
    logoUrl: string;
    links: TablesUpdate<"links">[];
  };
  isPreviewMode: boolean;
};
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function Preview({ brand, isPreviewMode }: PreviewProps) {
  const { logoUrl, name, description, website, links } = brand;
  const socialLinks = links.filter((link) => link.type === linkType.social);
  const filteredLinks = links.filter((link) => link.type !== linkType.social);

  return (
    <Card className="flex aspect-[9/16] min-w-[400px] flex-col items-center p-4 text-center xl:shadow-md">
      <CardHeader>
        <Image
          src={logoUrl}
          alt="Brand Icon"
          height={128}
          width={128}
          className="m-auto max-h-[128px] max-w-[128px] rounded-full border-2 border-inherit"
        />
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription className="whitespace-pre-wrap">
          {description}
        </CardDescription>
        {website && (
          <CardDescription>
            <a href={website} target="_blank" rel="noopener noreferrer">
              Personal Website <Link2Icon className="inline-block h-4 w-4" />
            </a>
          </CardDescription>
        )}
        <Links links={filteredLinks} />
      </CardContent>
      <Footer
        brandUrl={`${defaultUrl}/${brand.name}`}
        socialLinks={socialLinks}
        isPreviewMode={isPreviewMode}
      />
    </Card>
  );
}
