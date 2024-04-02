export const Links = {
  meeting1: "meeting1",
  meeting2: "meeting2",
  meeting3: "meeting3",
  meeting4: "meeting4",
} as const;

export const linksKeys = Object.keys(Links) as Array<keyof typeof Links>;
export const linksValues = Object.values(Links) as Array<string>;
export type LinkKey = (typeof linksKeys)[number];
export type LinkValue = (typeof linksValues)[number];
