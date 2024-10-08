import Link from "next/link";
import AuthButton from "../AuthButton";
import { Button } from "@/components/ui/button";
import { ArrowDown, CloudIcon, HomeIcon } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const headerRoutes = [
  {
    name: "My brands",
    href: "/brands" as const,
    icon: HomeIcon,
  },
];
export default function Header() {
  return (
    <header className="bg-white shadow-sm dark:bg-gray-800">
      <div className="m-auto flex max-w-screen-2xl items-center justify-between gap-2">
        <Link className="flex items-center" href={"/"}>
          <CloudIcon />
          <h1 className="m-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Awp
          </h1>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <HoverCard openDelay={100}>
            <HoverCardTrigger className="hidden md:block">
              <Button variant="ghost">
                Dashboard
                <ArrowDown
                  className="ml-1 transition-transform hover:rotate-180"
                  width={12}
                  height={12}
                />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <li className="flex flex-col gap-2">
                {headerRoutes.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center rounded-md px-2 py-2 text-gray-600 hover:bg-gray-200 md:px-4 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <span className="mx-2 text-lg font-normal md:mx-4">
                      <item.icon />
                    </span>
                    <span className="hidden md:block">{item.name}</span>
                  </Link>
                ))}
              </li>
            </HoverCardContent>
          </HoverCard>
        </div>
        <AuthButton />
      </div>
    </header>
  );
}
