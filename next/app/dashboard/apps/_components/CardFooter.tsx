import { App } from "@/types";
import { CardFooter } from "@/components/ui/card";
import DeleteButton from "./DeleteButton";
import { Button } from "@/components/ui/button";
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
      <Button variant="secondary">Edit</Button>
      <DeleteButton appId={app.id} />
    </CardFooter>
  );
}
