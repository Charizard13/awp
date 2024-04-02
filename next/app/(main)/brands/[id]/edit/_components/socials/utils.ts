import * as z from "zod";

const optionalUrl = z.union([
  z.string().url().max(150).optional(),
  z.literal(""),
]);

const optionalString = z.union([z.string().max(150).optional(), z.literal("")]);

// https://wa.me/<number>
// /^https:\/\/wa\.me\+972([0-9]{8,100})$/;
const optionalWhatsAppNumber = z.union([
    z.string().regex(
      /^https:\/\/wa\.me\+972([0-9]{8,100})$/,
      "WhatsApp number +972 xx xxx xxxx",
    ).optional(),
  z.literal(""),
]);

// https://www.instagram.com/<username>
// /^https:\/\/www\.instagram\.com\/([a-zA-Z0-9_-]{1,30})$/
const optionalInstagram = z.union([
  z.string().regex(
    /^https:\/\/www\.instagram\.com\/([a-zA-Z0-9_-]{1,30})$/,
    "Instagram username (only letters, numbers, _ and -)",
  ).optional(),
  z.literal(""),
]);

// https://www.facebook.com/<username>
// /^https:\/\/www\.facebook\.com\/([a-zA-Z0-9_-]{1,50})$/
const optionalFacebook = z.union([
  z.string().regex(
    /^https:\/\/www\.facebook\.com\/([a-zA-Z0-9_-]{1,50})$/,
    "Facebook username (only letters, numbers, _ and -)",  
  ).optional(),
  z.literal(""),
]);

// https://twitter.com/<username>
// /^https:\/\/twitter\.com\/([a-zA-Z0-9_-]{1,15})$/
const optionalTwitter = z.union([
  z.string().regex(
    /^https:\/\/twitter\.com\/([a-zA-Z0-9_-]{1,15})$/,
    "Twitter username (only letters, numbers, _ and -)",
  ).optional(),
  z.literal(""),
]);

// https://www.linkedin.com/in/<username>
// /^https:\/\/www\.linkedin\.com\/in\/([a-zA-Z0-9_-]{1,50})$/
const optionalLinkedIn = z.union([
  z.string().regex(
    /^https:\/\/www\.linkedin\.com\/in\/([a-zA-Z0-9_-]{1,50})$/,
    "LinkedIn username (only letters, numbers, _ and -)",
  ).optional(),
  z.literal(""),
]);

// https://www.tiktok.com/@<username>
// /^https:\/\/www\.tiktok\.com\/@([a-zA-Z0-9_-]{1,50})$/
const optionalTikTok = z.union([
  z.string().regex(
    /^https:\/\/www\.tiktok\.com\/@([a-zA-Z0-9_-]{1,50})$/,
    "TikTok username (only letters, numbers, _ and -)",
  ).optional(),
  z.literal(""),
]);

// https://www.snapchat.com/add/<username>
// /^https:\/\/www\.snapchat\.com\/add\/([a-zA-Z0-9_-]{1,15})$/
const optionalSnapchat = z.union([
  z.string().regex(
    /^https:\/\/www\.snapchat\.com\/add\/([a-zA-Z0-9_-]{1,15})$/,
    "Snapchat username (only letters, numbers, _ and -)",
  ).optional(),
  z.literal(""),
]);

// https://www.youtube.com/channel/<channel>
// /^https:\/\/www\.youtube\.com\/channel\/([a-zA-Z0-9_-]{1,50})$/
const optionalYouTube = z.union([
  z.string().regex(
    /^https:\/\/www\.youtube\.com\/channel\/([a-zA-Z0-9_-]{1,50})$/,
    "YouTube channel (only letters, numbers, _ and -)",
  ).optional(),
  z.literal(""),
]);


export const formSchema = z.object({
  whatsApp: optionalWhatsAppNumber as z.ZodUnion<
    [z.ZodOptional<z.ZodType<string, z.ZodTypeDef, string>>, z.ZodLiteral<"">]
  >,
  instagram: optionalInstagram,
  facebook: optionalFacebook,
  twitter: optionalTwitter,
  linkedIn: optionalLinkedIn,
  tikTok: optionalTikTok,
  snapchat: optionalSnapchat,
  youtube: optionalYouTube,
});
