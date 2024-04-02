export const Links = {
  payment1: "payment1",
    payment2: "payment2",
    payment3: "payment3",
    payment4: "payment4",
} as const;

export const linksKeys = Object.keys(Links) as Array<keyof typeof Links>;
export const linksValues = Object.values(Links) as Array<string>;
export type LinkKey = (typeof linksKeys)[number];
export type LinkValue = (typeof linksValues)[number];
