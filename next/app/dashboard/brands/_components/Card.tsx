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

type BrandCardProps = {
  brand: Tables<"brands"> & {
    logoUrl: string;
  };
};

export default function BrandCard({ brand }: BrandCardProps) {
  const { iconUrl, name, description, url } = brand;

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{url}</CardDescription>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Image
          src={iconUrl}
          alt="Brand Icon"
          height={128}
          width={128}
          className="rounded-md"
        />
      </CardContent>
      <BrandCardFooter brand={brand} />
    </Card>
  );
}
