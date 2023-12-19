"use client";

import { useParams } from "next/navigation";
import { HomeIcon, SendToBackIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const params = useParams();
  const brandId = params?.id;

  const dashboardRoutes = [
    {
      name: "Brands",
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
    <ul className="flex flex-col gap-4 border-r border-gray-300 p-2 md:p-4">
      {dashboardRoutes.map((item) => (
        <li key={item.name}>
          <Button asChild variant={"ghost"} className="flex w-full gap-2">
            <Link href={item.href}>
              <item.icon className="h-6 w-6" />
              <span className="hidden flex-1 text-lg md:block">
                {item.name}
              </span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
