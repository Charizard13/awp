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
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { linkType } from "@/lib/consts";
import { handleLinks } from "@/lib/links";

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
      meeting1: links[0]?.url,
      meeting2: links[1]?.url,
      meeting3: links[2]?.url,
      meeting4: links[3]?.url,
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
        type: linkType.calender,
        sub_type: link,
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
      const output: TablesUpdate<"links">[] = Object.entries(values).map(
        ([key, value]) => ({
          type: linkType.calender,
          description: key,
          url: value,
          id: links.find((l) => l.description === key)?.id,
        }),
      );

      return await handleLinks(brandId, output, linkType.calender);
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
