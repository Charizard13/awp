export const Links = {
  whatsApp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter",
  linkedIn: "LinkedIn",
  tikTok: "TikTok",
  snapchat: "Snapchat",
  youtube: "YouTube",
} as const;

export const linksKeys = Object.keys(Links) as Array<keyof typeof Links>;
export const linksValues = Object.values(Links) as Array<string>;
export type LinkKey = (typeof linksKeys)[number];
export type LinkValue = (typeof linksValues)[number];
