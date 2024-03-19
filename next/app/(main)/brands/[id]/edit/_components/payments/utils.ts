import * as z from "zod";

const optionalUrl = z.union([
  z.string().url().max(150).optional(),
  z.literal(""),
]);

const optionalString = z.union([z.string().max(150).optional(), z.literal("")]);

// https://wa.me/<number>
// /^https:\/\/wa\.me\/([0-9]{8,100})$/;
const optionalWhatsAppNumber = z.union([
  z
    .custom(
      (val) => {
        if (typeof val !== "string") return false;
        if (!val) return true;
        const whatsappLinkRegex = /^[0-9]{8,100}$/;
        return whatsappLinkRegex.test(val);
      },
      {
        message: "Invalid WhatsApp number(only numbers)",
      },
    )

    .optional(),
  z.literal(""),
]);

export const formSchema = z.object({
  whatsApp: optionalWhatsAppNumber as z.ZodUnion<
    [z.ZodOptional<z.ZodType<string, z.ZodTypeDef, string>>, z.ZodLiteral<"">]
  >,
  store: optionalUrl,
  instagram: optionalString,
  paymentPage: optionalUrl,
  calender: optionalUrl,
});
