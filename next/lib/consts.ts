import { LinkType } from "@/types/links";

export const appAssets = {
  logo: "logo",
} as const;

export const linkType: Record<LinkType, LinkType> = {
  social: "social",
  payment: "payment",
  calender: "calender",
  profile: "profile",
} as const;
