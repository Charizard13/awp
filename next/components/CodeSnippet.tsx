"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { CopyIcon } from "lucide-react";
import { ReactElement, useState } from "react";

export type Framework = {
  name: string;
  svgIcon: ReactElement;
  instructions: string;
  code: string;
};

type CodeSnippetProps = {
  frameworks: Framework[];
};

export default function CodeSnippet({ frameworks }: CodeSnippetProps) {
  const [currentFramework, setCurrentFramework] = useState<Framework>(frameworks[0]);
  const formattedCodeWithLineBreaks = currentFramework.code.replace(/\/>/g, "/>\n");

  const handleCopy = () => {
    if (!formattedCodeWithLineBreaks) return;
    navigator.clipboard.writeText(formattedCodeWithLineBreaks);
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
          <span> Follow the instructions below to add this code snippet to your app.</span>
          <Button variant="outline" size="icon">
            <CopyIcon onClick={handleCopy} />
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {frameworks && (
          <div className="flex flex-wrap gap-4">
            {frameworks.map((framework) => (
              <Button key={framework.name} variant={currentFramework.name === framework.name ? "secondary" : "outline"} size="sm" onClick={() => setCurrentFramework(framework)}>
                {framework.svgIcon}
                <span>{framework.name}</span>
              </Button>
            ))}
          </div>
        )}
        <CardDescription>{currentFramework.instructions}</CardDescription>
        <div className="p-6 bg-gray-800 text-white rounded-md text-xs" style={{ whiteSpace: "pre-line" }}>
          <code>{formattedCodeWithLineBreaks}</code>
        </div>
      </CardContent>
    </Card>
  );
}
