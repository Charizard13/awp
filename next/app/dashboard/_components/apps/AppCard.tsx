import Image from "next/image";
import CodeSnippet from "@/components/CodeSnippet";
import { App } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppCardFooter from "./AppCardFooter";

type AppCardProps = {
  app: App & {
    iconUrl: string;
    manifestUrl: string;
    scriptUrl: string;
  };
};

export default function AppCard({ app }: AppCardProps) {
  const { iconUrl, name, description, manifestUrl, scriptUrl } = app;

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={iconUrl}
          alt="App Icon"
          height={128}
          width={128}
          className="rounded-md"
        />
        <CodeSnippet
          code={`<link rel="manifest" href="${manifestUrl}" />
                <script src="${scriptUrl}" defer />`}
          description="Copy this and paste between the <head> tags of your app."
        />
      </CardContent>
      <AppCardFooter app={app} />
    </Card>
  );
}
