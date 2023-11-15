import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import IconButton from "./ui/iconButton";

type CodeSnippetProps = {
  code: string;
  description: string;
};

export default function CodeSnippet({ code, description }: CodeSnippetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Code Snippet</CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>{description} </span>
          <IconButton icon="content_copy" label="Copy" />
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 bg-gray-800 text-white rounded-md ">
        <code>{code}</code>
      </CardContent>
    </Card>
  );
}
