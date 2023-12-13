import Image from "next/image";
import CodeSnippet, { Framework } from "@/components/CodeSnippet";
import { App } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

  const frameworks: Framework[] = [
    {
      name: "React",
      svgIcon: (
        <svg viewBox="175.7 78 490.6 436.9" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2">
          <g fill="#61dafb">
            <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z" />
            <circle cx="420.9" cy="296.5" r="45.7" />
          </g>
        </svg>
      ),
      code: `<link rel="manifest" href="${manifestUrl}" />
            <script src="${scriptUrl}" defer />`,
      instructions: `Add the following code to the <head> of your React app. You can do this by editing your index.html file.`,
    },
    {
      name: "Next.js",
      svgIcon: (
        <svg viewBox=".5 -.2 1023 1024.1" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2">
          <path d="m478.5.6c-2.2.2-9.2.9-15.5 1.4-145.3 13.1-281.4 91.5-367.6 212-48 67-78.7 143-90.3 223.5-4.1 28.1-4.6 36.4-4.6 74.5s.5 46.4 4.6 74.5c27.8 192.1 164.5 353.5 349.9 413.3 33.2 10.7 68.2 18 108 22.4 15.5 1.7 82.5 1.7 98 0 68.7-7.6 126.9-24.6 184.3-53.9 8.8-4.5 10.5-5.7 9.3-6.7-.8-.6-38.3-50.9-83.3-111.7l-81.8-110.5-102.5-151.7c-56.4-83.4-102.8-151.6-103.2-151.6-.4-.1-.8 67.3-1 149.6-.3 144.1-.4 149.9-2.2 153.3-2.6 4.9-4.6 6.9-8.8 9.1-3.2 1.6-6 1.9-21.1 1.9h-17.3l-4.6-2.9c-3-1.9-5.2-4.4-6.7-7.3l-2.1-4.5.2-200.5.3-200.6 3.1-3.9c1.6-2.1 5-4.8 7.4-6.1 4.1-2 5.7-2.2 23-2.2 20.4 0 23.8.8 29.1 6.6 1.5 1.6 57 85.2 123.4 185.9s157.2 238.2 201.8 305.7l81 122.7 4.1-2.7c36.3-23.6 74.7-57.2 105.1-92.2 64.7-74.3 106.4-164.9 120.4-261.5 4.1-28.1 4.6-36.4 4.6-74.5s-.5-46.4-4.6-74.5c-27.8-192.1-164.5-353.5-349.9-413.3-32.7-10.6-67.5-17.9-106.5-22.3-9.6-1-75.7-2.1-84-1.3zm209.4 309.4c4.8 2.4 8.7 7 10.1 11.8.8 2.6 1 58.2.8 183.5l-.3 179.8-31.7-48.6-31.8-48.6v-130.7c0-84.5.4-132 1-134.3 1.6-5.6 5.1-10 9.9-12.6 4.1-2.1 5.6-2.3 21.3-2.3 14.8 0 17.4.2 20.7 2z" />
          <path d="m784.3 945.1c-3.5 2.2-4.6 3.7-1.5 2 2.2-1.3 5.8-4 5.2-4.1-.3 0-2 1-3.7 2.1zm-6.9 4.5c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-5 3c-1.8 1.4-1.8 1.5.4.4 1.2-.6 2.2-1.3 2.2-1.5 0-.8-.5-.6-2.6 1.1zm-7.6 4c-3.8 2-3.6 2.8.2.9 1.7-.9 3-1.8 3-2 0-.7-.1-.6-3.2 1.1z" />
        </svg>
      ),
      code: `<link rel="manifest" href="${manifestUrl}" />
            <Script src="${scriptUrl}" defer strategy="afterInteractive" />`,
      instructions: `Add the following code to the <head> of your Next.js app. You can do this by editing your _document.js file.`,
    },
    {
      name: "Wordpress",
      svgIcon: (
        <svg viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2">
          <path
            d="M18.124 127.5c0 43.296 25.16 80.711 61.646 98.442L27.594 82.986a108.965 108.965 0 0 0-9.47 44.514zm183.221-5.52c0-13.517-4.856-22.879-9.02-30.165-5.545-9.01-10.742-16.64-10.742-25.65 0-10.055 7.626-19.415 18.368-19.415.485 0 .944.06 1.417.088-19.46-17.829-45.387-28.714-73.863-28.714-38.213 0-71.832 19.606-91.39 49.302 2.566.077 4.984.13 7.039.13 11.44 0 29.15-1.387 29.15-1.387 5.897-.348 6.592 8.312.702 9.01 0 0-5.926.697-12.52 1.042L100.32 194.7l23.937-71.79-17.042-46.692c-5.89-.345-11.47-1.042-11.47-1.042-5.894-.346-5.203-9.358.691-9.01 0 0 18.064 1.388 28.811 1.388 11.44 0 29.151-1.388 29.151-1.388 5.9-.348 6.594 8.312.702 9.01 0 0-5.938.697-12.52 1.042l39.529 117.581 10.91-36.458c4.728-15.129 8.327-25.995 8.327-35.36zm-71.921 15.088l-32.818 95.363a109.376 109.376 0 0 0 30.899 4.456c12.737 0 24.952-2.202 36.323-6.2a9.605 9.605 0 0 1-.779-1.507l-33.625-92.112zm94.058-62.045c.47 3.484.737 7.224.737 11.247 0 11.1-2.073 23.577-8.317 39.178l-33.411 96.6c32.518-18.963 54.39-54.193 54.39-94.545.002-19.017-4.856-36.9-13.4-52.48zM127.505 0C57.2 0 0 57.196 0 127.5c0 70.313 57.2 127.507 127.505 127.507 70.302 0 127.51-57.194 127.51-127.507C255.014 57.196 197.808 0 127.506 0zm0 249.163c-67.08 0-121.659-54.578-121.659-121.663 0-67.08 54.576-121.654 121.659-121.654 67.078 0 121.652 54.574 121.652 121.654 0 67.085-54.574 121.663-121.652 121.663z"
            fill="#464342"
          />
        </svg>
      ),
      code: `<link rel="manifest" href="${manifestUrl}" />
            <script src="${scriptUrl}" defer />`,
      instructions: `Add the following code to the <head> of your WordPress site. You can do this by editing your theme's header.php file.`,
    },
  ];

  return (
    <Card className="w-full max-w-screen-lg">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{url}</CardDescription>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Image src={iconUrl} alt="App Icon" height={128} width={128} className="rounded-md" />

        <CodeSnippet frameworks={frameworks} />
      </CardContent>
      <AppCardFooter app={app} />
    </Card>
  );
}
