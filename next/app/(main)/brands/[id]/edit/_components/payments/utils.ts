import * as z from "zod";

const optionalUrl = z.union([
  z.string().url().max(150).optional(),
  z.literal(""),
]);

export const formSchema = z.object({
  payment1 : optionalUrl,
  payment2 : optionalUrl,
  payment3 : optionalUrl,
  payment4 : optionalUrl,
});
