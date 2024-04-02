import * as z from "zod";

const optionalUrl = z.union([
  z.string().url().max(500).optional(),
  z.literal(""),
]);
const optionalDescription = z.union([
  z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters long",
    })
    .max(150, {
      message: "Description must be less than 150 characters long",
    })
    .optional(),
  z.literal(""),
]);

const optionalLogo = z.union([
  z
    .instanceof(File)
    .refine((file) => file.size > 50_000_000, {
      message: "Logo must be less than 50MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "Logo must be an image",
    })
    .optional(),
  z.literal(undefined),
]);
export const formSchema = z.object({
  logo: optionalLogo,
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Only letters, numbers and underscores are allowed",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Name must be less than 50 characters long",
    }),
  website: optionalUrl,
  description: optionalDescription,
});
