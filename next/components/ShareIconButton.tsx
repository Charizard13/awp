"use client";

import { ShareIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type ShareIconButtonProps = {
  url: string;
  title?: string;
  text?: string;
};
export default function ShareIconButton({
  url,
  title,
  text,
}: ShareIconButtonProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "You can now share this link",
        duration: 5000,
      });
    });
  };

  const handleClick = () => {
    try {
      if (navigator.share) {
        navigator.share({
          title: title ?? undefined,
          text: text ?? undefined,
          url: url,
        });
        return;
      }
      copyToClipboard();
    } catch (error) {
      copyToClipboard();
    }
  };
  return (
    <Button variant="outline" size="icon" onClick={handleClick}>
      <ShareIcon className="h-4 w-4" />
    </Button>
  );
}
