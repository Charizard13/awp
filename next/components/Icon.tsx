import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { LinkKey } from "@/app/(main)/brands/[id]/edit/_components/links/consts";
import { WhatAppIcon } from "./icons/WhatsApp";

const convertToKebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

interface IconProps extends LucideProps {
  name: string | LinkKey;
}

const Icon = ({ name, ...props }: IconProps) => {
  if (name === "whatsApp") {
    return <WhatAppIcon {...props} />;
  }

  const lowerCaseName = convertToKebabCase(
    name,
  ) as keyof typeof dynamicIconImports;

  const LucideIcon = dynamic(dynamicIconImports[lowerCaseName]);

  return <LucideIcon {...props} />;
};

export default Icon;
