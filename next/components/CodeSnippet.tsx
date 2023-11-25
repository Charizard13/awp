"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";

type CodeSnippetProps = {
  code: string;
  description: string;
};

export default function CodeSnippet({ code, description }: CodeSnippetProps) {
  const formattedCodeWithLineBreaks = code.replace(/\/>/g, "/>\n");

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
          <Button variant="outline" size="icon">
            <CopyIcon onClick={handleCopy} />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-gray-800 text-white rounded-md text-xs" style={{ whiteSpace: "pre-line" }}>
        <code>{formattedCodeWithLineBreaks}</code>
      </CardContent>
    </Card>
  );
}
