import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import ShareIconButton from "../ShareIconButton";
import { TablesInsert, TablesUpdate } from "@/types";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  Youtube,
  YoutubeIcon,
} from "lucide-react";
import { WhatAppIcon } from "../icons/WhatsApp";
import { TikTokIcon } from "../icons/TikTok";
import Icon from "../Icon";

type PreviewFooterProps = {
  brandUrl: string;
  socialLinks: TablesInsert<"links">[] | TablesUpdate<"links">[];
  isPreviewMode: boolean;
};

export default function PreviewFooter({
  brandUrl,
  socialLinks,
  isPreviewMode,
}: PreviewFooterProps) {
  return (
    <CardFooter className="mt-auto flex w-full flex-col gap-4">
      <div className="flex gap-4">
        {socialLinks.map((link) => (
          <Button
            asChild
            key={link.id}
            size="icon"
            variant="ghost"
            className="hover:cursor-pointer"
          >
            <a href={link.url} target="_blank" rel="noreferrer">
              <Icon name={link.description!} />
            </a>
          </Button>
        ))}
      </div>
      <div className="flex gap-4">
        {!isPreviewMode && (
          <>
            <Button asChild className="w-full">
              <Link href="/brands/create">Create your own brand</Link>
            </Button>
          </>
        )}
      </div>
    </CardFooter>
  );
}
