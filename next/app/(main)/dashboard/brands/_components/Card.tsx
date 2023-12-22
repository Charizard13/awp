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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type BrandCardProps = {
  brand: Tables<"brands"> & {
    logoUrl: string;
  };
};

export default function BrandCard({ brand }: BrandCardProps) {
  const { logoUrl, name, description } = brand;
  const capitalShortName = name.slice(0, 2).toUpperCase();

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
        <Avatar className="size-32 m-auto border-2 border-inherit">
          <AvatarImage src={logoUrl} alt="Brand Icon" />
          <AvatarFallback>{capitalShortName}</AvatarFallback>
        </Avatar>
      </CardContent>
      <BrandCardFooter brand={brand} />
    </Card>
  );
}
