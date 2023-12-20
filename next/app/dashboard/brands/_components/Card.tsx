import Image from "next/image";
import CodeSnippet, { Framework } from "@/components/CodeSnippet";
import { Tables } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BrandCardFooter from "./CardFooter";
import Link from "next/link";
import { Link2Icon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type BrandCardProps = {
  brand: Tables<"brands"> & {
    logoUrl: string;
  };
};

export default function BrandCard({ brand }: BrandCardProps) {
  const { logoUrl, name, description, url } = brand;
  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-4">
          <Image
            src={logoUrl}
            alt="Brand Icon"
            height={64}
            width={64}
            className="rounded-full border-2 border-inherit"
          />
          <Button asChild variant="outline" size="icon">
            <a href={`/${brand.name}`}>
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <BrandCardFooter brand={brand} />
    </Card>
  );
}
