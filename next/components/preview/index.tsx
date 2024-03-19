"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TablesInsert, TablesUpdate } from "@/types";
import { ExternalLinkIcon } from "lucide-react";
import Footer from "./Footer";
import Links from "./Links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IphoneWrapper from "./IPhoneWrapper";
import { linksKeys } from "@/app/(main)/brands/[id]/edit/_components/socials/consts";

type PreviewProps = {
  brand: TablesUpdate<"brands"> & {
    logoUrl: string;
    links: TablesInsert<"links">[] | TablesUpdate<"links">[];
  };
  isPreviewMode: boolean;
};
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default function Preview({ brand, isPreviewMode }: PreviewProps) {
  const { logoUrl, name, description, website } = brand;
  const capitalShortName = name?.slice(0, 2).toUpperCase();
  // @ts-ignore
  const socialLinks = brand.links.filter(({ name}) => name && linksKeys.includes(name));


  return (
    <IphoneWrapper>
      <Card className="flex aspect-[9/16] min-w-[400px] flex-col items-center p-4 text-center xl:shadow-md">
        <CardHeader>
          <Avatar className="mx-auto size-32 border-2 border-inherit">
            <AvatarImage src={logoUrl} alt="Brand Icon" />
            <AvatarFallback>{capitalShortName}</AvatarFallback>
          </Avatar>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {description && (
            <CardDescription className="text-md whitespace-pre-wrap">
              {description}
            </CardDescription>
          )}
          {website && (
            <CardDescription>
              <a
                href={website ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Personal Website</span>
                <ExternalLinkIcon className="mx-1 mb-1 inline-block h-4 w-4" />
              </a>
            </CardDescription>
          )}
          <Links links={brand.links} />
        </CardContent>
        {isPreviewMode && <Footer brandUrl={`${defaultUrl}/${brand.name}`} socialLinks={socialLinks} />}
      </Card>
    </IphoneWrapper>
  );
}
