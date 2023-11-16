import Link from "next/link";
import AuthButton from "../AuthButton";
import { Button } from "@/components/ui/button";
import { CloudIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { dashboardRoutes } from "@/app/dashboard/_components/SideBar";
export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 h-16 shadow-sm">
      <Link className="flex items-center" href={"/"}>
        <CloudIcon />
        <h1 className="ml-2 text-2xl font-semibold text-gray-900 dark:text-gray-100">Awp</h1>
      </Link>
      <HoverCard openDelay={100}>
        <HoverCardTrigger className="hidden md:block">
          <Button variant="ghost">Dashboard</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <li className="flex flex-col gap-2">
            {dashboardRoutes.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center py-2 px-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md md:px-4"
              >
                <span className="mx-2 md:mx-4 text-lg font-normal">
                  <item.icon />
                </span>
                <span className="hidden md:block">{item.name}</span>
              </Link>
            ))}
          </li>
        </HoverCardContent>
      </HoverCard>

      <AuthButton />
    </header>
  );
}
