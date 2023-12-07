import { App } from "@/types";
import { CardFooter } from "@/components/ui/card";
import DeleteButton from "./DeleteButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type AppCardFooterProps = {
  app: App & {
    iconUrl: string;
    manifestUrl: string;
    scriptUrl: string;
  };
};

export default function AppCardFooter({ app }: AppCardFooterProps) {
  return (
    <CardFooter className="flex justify-end gap-4">
      <Button variant="secondary" asChild>
        <Link href={`/dashboard/apps/${app.id}/edit`}>Edit</Link>
      </Button>
      <DeleteButton appId={app.id} />
    </CardFooter>
  );
}
