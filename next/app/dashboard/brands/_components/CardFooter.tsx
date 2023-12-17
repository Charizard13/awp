import { Tables } from "@/types";
import { CardFooter } from "@/components/ui/card";
import DeleteButton from "./DeleteButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type BrandCardFooterProps = {
  brand: Tables<"brands"> & {
    iconUrl: string;
  };
};

export default function BrandCardFooter({ brand }: BrandCardFooterProps) {
  return (
    <CardFooter className="flex justify-end gap-4">
      <Button variant="secondary" asChild>
        <Link href={`/dashboard/brands/${brand.id}/edit`}>Edit</Link>
      </Button>
      <DeleteButton brandId={brand.id} />
    </CardFooter>
  );
}
