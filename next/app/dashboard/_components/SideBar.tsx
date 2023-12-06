import { Separator } from "@/components/ui/separator";
import { ClipboardIcon, HomeIcon, PaletteIcon, SendToBackIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";

export const dashboardRoutes = [
  {
    name: "Home",
    href: "/dashboard/apps" as const,
    icon: HomeIcon,
  },
  {
    name: "Create App",
    href: "/dashboard/apps/create" as const,
    icon: ClipboardIcon,
  },
  // {
  //   name: "Service Workers",
  //   href: "/dashboard/service-workers" as const,
  //   icon: SendToBackIcon,
  // },
  // {
  //   name: "Design",
  //   href: "/dashboard/design" as const,
  //   icon: PaletteIcon,
  // },
  // {
  //   name: "Settings",
  //   href: "/dashboard/settings" as const,
  //   icon: SettingsIcon,
  // },
];

export default function SideBar() {
  return (
    <ul className="flex flex-col md:gap-2 border-r border-gray-300 p-2 md:p-4">
      {dashboardRoutes.map((item) => (
        <li key={item.name}>
          <Link href={item.href} className="flex items-center py-2 px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md md:px-4">
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
