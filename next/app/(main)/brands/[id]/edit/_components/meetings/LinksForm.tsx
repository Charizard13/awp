"use client";
import { Input } from "@/components/ui/input";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TablesInsert, TablesUpdate } from "@/types";
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

type LinksFormProps = {
  links: TablesUpdate<"links">[];
  brandId: string;
  setNextBrand: (
    value: React.SetStateAction<
      | (TablesUpdate<"brands"> & {
          logoUrl: string;
          links: TablesUpdate<"links">[];
        })
      | undefined
    >,
  ) => void;
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
      whatsApp: links.find((l) => l.description === Links.whatsApp)?.url,
      store: links.find((l) => l.description === Links.store)?.url,
      instagram: links.find((l) => l.description === Links.instagram)?.url,
      paymentPage: links.find((l) => l.description === Links.paymentPage)?.url,
      calender: links.find((l) => l.description === Links.calender)?.url,
    },
  });

  const handleOnLinkChange = (value: string, link: string) => {
    const linkIndex = links.findIndex((l) => l.description === link);
    if (linkIndex > -1) {
      if (value === "") {
        links.splice(linkIndex, 1);
      } else {
        links[linkIndex].url = value;
      }
    } else {
      links.push({
        description: link,
        url: value,
        brand_id: brandId,
      });
    }
    setNextBrand((prevState) => {
      if (!prevState) {
        return;
      }
      return {
        ...prevState,
        links,
      };
    });
  };

  const { mutateAsync: updateBrandLinks, isPending } = useMutation({
    mutationKey: ["brand", brandId],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const supabase = createWebClient();
      const user = await supabase.auth.getUser();
      const userId = user?.data?.user?.id;
      if (!userId) {
        throw new Error("You must be logged in to update metadata.");
      }

      const outputLinks: TablesUpdate<"links">[] = Object.entries(values).map(
        ([description, url]) => ({
          description,
          url,
          brand_id: brandId,
        }),
      );
      const linksToDelete = outputLinks.filter((l) => l.url === "");
      const linksToInsert: TablesInsert<"links">[] = outputLinks
        .filter((l) => !!l.url && !!l.description) // Filter out objects where url or description is undefined
        .map((l) => ({
          ...l,
          brand_id: brandId,
          description: l.description || "", // Provide a default empty string if description is undefined
          url: l.url || "", // Provide a default empty string if url is undefined
        }));

      if (linksToInsert.length === 0) {
        return;
      }
      const { error } = await supabase.from("links").upsert(linksToInsert);
      if (error) {
        console.log(error);
        throw new Error(error.message);
      }

      if (linksToDelete.length > 0) {
        const { error } = await supabase
          .from("links")
          .delete()
          .in(
            "id",
            linksToDelete.map((l) => l.id),
          );
        if (error) {
          console.log(error);
          throw new Error(error.message);
        }
      }
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
        <CardTitle className="text-xl">Edit Links</CardTitle>
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
                          handleOnLinkChange(e.target.value, link);
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
