import * as z from "zod";

const optionalUrl = z.union([
  z.string().url().max(150).optional(),
  z.literal(""),
]);

export const formSchema = z.object({
  meeting1: optionalUrl,
  meeting2: optionalUrl,
  meeting3: optionalUrl,
  meeting4: optionalUrl,
});
