import Image from "next/image";
import { Tables } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BrandCardFooter from "./CardFooter";
import { ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type BrandCardProps = {
  brand: Tables<"brands"> & {
    logoUrl: string;
  };
};

export default function BrandCard({ brand }: BrandCardProps) {
  const { logoUrl, name, description } = brand;
  return (
    <Card className="mx-auto h-fit flex-1">
      <CardHeader>
        <div className="flex flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button asChild variant="outline" size="icon">
            <a href={`/${brand.name}`} target="_blank" rel="noreferrer">
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Image
          src={logoUrl}
          alt="Brand Icon"
          height={128}
          width={128}
          className="m-auto rounded-full border-2 border-inherit max-w-[128px] max-h-[128px]"
        />
      </CardContent>
      <BrandCardFooter brand={brand} />
    </Card>
  );
}
