"use client";
import { Input } from "@/components/ui/input";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TablesUpdate } from "@/types";
import { Links, linksKeys } from "./consts";
import Footer from "./Footer";
import { formSchema } from "./utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { createWebClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { handleLinks } from "@/lib/links";
import { linkType } from "@/lib/consts";
import { handleOnLinkChange } from "@/app/(main)/brands/[id]/edit/_lib/utils";
import { SetBrand } from "@/app/(main)/brands/[id]/edit/_lib/types";
import {QUERY_KEYS} from "@/lib/queries";

const getLinkDefaultValue = (links: TablesUpdate<"links">[], link: string) => {
  const linkValue = links.find((l) => l.description === link)?.url;
  return linkValue ? linkValue : "";
};

type LinksFormProps = {
  links: TablesUpdate<"links">[];
  brandId: string;
  setNextBrand: SetBrand;
};

export default function LinksForm({
  links,
  setNextBrand,
  brandId,
}: LinksFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      whatsApp: getLinkDefaultValue(links, Links.whatsApp),
      instagram: getLinkDefaultValue(links, Links.instagram),
      facebook: getLinkDefaultValue(links, Links.facebook),
      twitter: getLinkDefaultValue(links, Links.twitter),
      linkedIn: getLinkDefaultValue(links, Links.linkedIn),
      tikTok: getLinkDefaultValue(links, Links.tikTok),
      snapchat: getLinkDefaultValue(links, Links.snapchat),
      youtube: getLinkDefaultValue(links, Links.youtube),
    },
  });

  const { mutateAsync: updateBrandLinks, isPending } = useMutation({
    mutationKey: [QUERY_KEYS.BRAND, brandId],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const output: TablesUpdate<"links">[] = Object.entries(values).map(
        ([key, value]) => ({
          type: linkType.social,
          description: key,
          url: value,
          id: links.find((l) => l.description === key)?.id,
        }),
      );
      return await handleLinks(brandId, output, linkType.social);
    },
    onSuccess: () =>
      toast({
        title: "Links updated",
        description: "Links updated successfully",
      }),
    onError: (e) =>
      toast({
        title: "Error",
        description: e.message,
      }),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) =>
    updateBrandLinks(values);

  return (
    <Card className="flex aspect-[9/16] min-w-[400px] flex-col p-4 xl:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Social Links</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            {linksKeys.map((link) => (
              <FormField
                control={form.control}
                name={link}
                key={link}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{Links[link]}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${link} link`}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnLinkChange(
                            e.target.value,
                            link,
                            setNextBrand,
                            linkType.social,
                            brandId,
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <Footer isPending={isPending} />
        </form>
      </Form>
    </Card>
  );
}

// const linksToDelete = outputLinks.filter((l) => l.url === "");
// const linksToInsert: TablesInsert<"links">[] = outputLinks
//   .filter((l) => !!l.url && !!l.description) // Filter out objects where url or description is undefined
//   .map((l) => ({
//     ...l,
//     brand_id: brandId,
//     description: l.description || "", // Provide a default empty string if description is undefined
//     url: l.url || "", // Provide a default empty string if url is undefined
//   }));

// if (linksToDelete.length > 0) {
//   const { error } = await supabase
//     .from("links")
//     .delete()
//     .in(
//       "id",
//       linksToDelete.map((l) => l.id),
//     );
//   if (error) {
//     throw new Error(error.message);
//   }
// }
