"use client";

import { useParams } from "next/navigation";
import { HomeIcon, ScanFaceIcon, CircleDollarSignIcon, PresentationIcon, CircleUserRoundIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SideBar() {
  const params = useParams();
  const brandId = params?.id;

  const dashboardRoutes = [
    {
      name: "Home",
      href: "/brands" as const,
      icon: HomeIcon,
    },
  ];

  if (brandId) {
    dashboardRoutes.push({
      name: "Profile",
      // @ts-ignore
      href: `/brands/${brandId}/edit?section=profile` as const,
      icon: CircleUserRoundIcon,
    });
    dashboardRoutes.push({
      name: "Socials",
      // @ts-ignore
      href: `/brands/${brandId}/edit?section=social` as const,
      icon: ScanFaceIcon,
    });
    dashboardRoutes.push({
      name: "Payments",
      // @ts-ignore
      href: `/brands/${brandId}/edit?section=payments` as const,
      icon: CircleDollarSignIcon,
    });
    dashboardRoutes.push({
      name: "Meetings",
      // @ts-ignore
      href: `/brands/${brandId}/edit?section=meetings` as const,
      icon: PresentationIcon,
    });
  }
  return (
    <ul className="flex gap-4 border-b border-gray-300 p-2 sm:flex-col sm:border-r md:p-4">
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
