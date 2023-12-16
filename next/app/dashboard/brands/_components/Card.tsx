import Image from "next/image";
import CodeSnippet, { Framework } from "@/components/CodeSnippet";
import { App } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AppCardFooter from "./CardFooter";

type AppCardProps = {
  app: App & {
    iconUrl: string;
    manifestUrl: string;
    scriptUrl: string;
  };
};

export default function AppCard({ app }: AppCardProps) {
  const { iconUrl, name, description, manifestUrl, scriptUrl, url } = app;

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{url}</CardDescription>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Image
          src={iconUrl}
          alt="App Icon"
          height={128}
          width={128}
          className="rounded-md"
        />
      </CardContent>
      <AppCardFooter app={app} />
    </Card>
  );
}
