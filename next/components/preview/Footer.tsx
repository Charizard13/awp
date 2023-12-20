import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareIconButton from "../ShareIconButton";

type PreviewFooterProps = {
  brandUrl: string;
};

export default function PreviewFooter({ brandUrl }: PreviewFooterProps) {
  return (
    <CardFooter className="mt-auto flex w-full gap-4">
      <Button asChild className="w-full">
        <Link href="/dashboard/brands/create">Create your own brand</Link>
      </Button>
      <ShareIconButton url={brandUrl} />
    </CardFooter>
  );
}
