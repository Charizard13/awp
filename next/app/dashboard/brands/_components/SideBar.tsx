"use client";

import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  ClipboardIcon,
  HomeIcon,
  PaletteIcon,
  SendToBackIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";

export default function SideBar() {
  const params = useParams();
  const brandId = params?.id;

  const dashboardRoutes = [
    {
      name: "My brands",
      href: "/dashboard/brands" as const,
      icon: HomeIcon,
    },
  ];
  if (brandId) {
    dashboardRoutes.push({
      name: "Profile",
      // @ts-ignore
      href: `/dashboard/brands/${brandId}/edit?section=profile` as const,
      icon: SettingsIcon,
    });
    dashboardRoutes.push({
      name: "Links",
      // @ts-ignore
      href: `/dashboard/brands/${brandId}/edit?section=links` as const,
      icon: SendToBackIcon,
    });
  }
  return (
    <ul className="flex flex-col border-r border-gray-300 p-2 md:gap-2 md:p-4">
      {dashboardRoutes.map((item) => (
        <li key={item.name}>
          <Link
            href={item.href}
            className="flex items-center rounded-md px-2 py-2 text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 md:px-4"
          >
            <span className="mx-2 font-normal">
              <item.icon />
            </span>
            <span className="hidden md:block">{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
