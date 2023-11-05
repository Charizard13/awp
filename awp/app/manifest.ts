import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AWP - Pwa made easy",
    short_name: "AWP",
    description: "AWP - Pwa made easy, is a chrome extension that helps you to convert your website into a PWA in just a few clicks.",
    display: "standalone",
    id: "/?source=pwa",
    start_url: "/?source=pwa",
    background_color: "#3367D6",
    scope: "/",
    theme_color: "#3367D6",
    screenshots: [
      {
        src: "/twitter-image.png",
        type: "image/png",
        sizes: "1200x600",
      },
      {
        src: "/opengraph-image.png",
        type: "image/png",
        form_factor: "wide",
        sizes: "1200x600",
      },
    ],
    related_applications: [
      {
        platform: "webapp",
        url: "https://example.com/manifest.json",
      },
    ],
    shortcuts: [
      {
        name: "How's weather tomorrow?",
        short_name: "Tomorrow",
        description: "View weather information for tomorrow",
        url: "/tomorrow?source=pwa",
        icons: [{ src: "/twitter-image.png", sizes: "1200x600" }],
      },
    ],
    icons: [
      {
        sizes: "513x513",
        src: "icon-128.png",
      },
    ],
  };
}
