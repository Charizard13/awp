export const Links = {
  store: "Store",
  whatsApp: "WhatsApp",
  instagram: "Instagram",
  paymentPage: "Payment Page",
  calender: "Calender",
} as const;

export const linksKeys = Object.keys(Links) as Array<keyof typeof Links>;
export const linksValues = Object.values(Links) as Array<string>;
export type LinkKey = (typeof linksKeys)[number];
export type LinkValue = (typeof linksValues)[number];
