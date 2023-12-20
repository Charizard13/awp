import { CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PreviewFooter() {
  return (
    <CardFooter className="mt-auto flex justify-end gap-4">
      <Button>Create your own brand</Button>
    </CardFooter>
  );
}
