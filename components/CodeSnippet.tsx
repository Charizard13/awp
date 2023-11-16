"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { IconButton } from "./ui/iconButton";
import { toast } from "./ui/use-toast";

type CodeSnippetProps = {
  code: string;
  description: string;
};

export default function CodeSnippet({ code, description }: CodeSnippetProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "You can now paste this code snippet into your app.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Snippet</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{description} </span>
          <IconButton icon="copy" onClick={handleCopy} />
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-gray-800 text-white rounded-md ">
        <code>{code}</code>
      </CardContent>
    </Card>
  );
}
