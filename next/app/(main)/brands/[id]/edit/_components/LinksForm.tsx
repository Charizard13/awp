"use client";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  CreditCardIcon,
  InstagramIcon,
  StoreIcon,
} from "lucide-react";
import React from "react";
import { WhatAppIcon } from "../../../../../../components/icons/WhatsApp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tables, TablesInsert, TablesUpdate } from "@/types";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { createWebClient } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import LoadingButton from "@/components/LoadingButton";

const Links = {
  Store: "Store",
  WhatsApp: "WhatsApp",
  Instagram: "Instagram",
  "Payment Page": "Payment Page",
  Calender: "Calender",
} as const;

const initialLinkButtons: Omit<TablesInsert<"links">, "brand_id">[] = [
  {
    description: Links.Store,
    url: "",
  },
  {
    description: Links.WhatsApp,
    url: "",
  },
  {
    description: Links.Instagram,
    url: "",
  },
  {
    description: Links["Payment Page"],
    url: "",
  },
  {
    description: Links.Calender,
    url: "",
  },
];

export const getLinkIcon = (description: string) => {
  switch (description) {
    case Links.Store:
      return <StoreIcon className="ml-2 h-4 w-4" />;
    case Links.WhatsApp:
      return <WhatAppIcon className="ml-2 h-4  w-4" />;
    case Links.Instagram:
      return <InstagramIcon className="ml-2 h-4 w-4" />;
    case Links["Payment Page"]:
      return <CreditCardIcon className="ml-2 h-4 w-4" />;
    case Links.Calender:
      return <CalendarIcon className="ml-2 h-4 w-4" />;
    default:
  }
};

type LinksFormProps = {
  links: TablesUpdate<"links">[];
  brandId: string;
  setNextBrand: (value: React.SetStateAction<any>) => void;
};

export default function LinksForm({
  links,
  setNextBrand,
  brandId,
}: LinksFormProps) {
  const { toast } = useToast();
  const setLink = (description: string, url: string, index: number) => {
    const outputLinks: TablesUpdate<"links">[] = structuredClone(links);
    const link = outputLinks.find((l) => l.description === description);
    if (link) {
      if (url === "") {
        outputLinks.splice(index, 1);
        return setNextBrand((prev: any) => ({ ...prev, links: outputLinks }));
      }
      link.url = url;
    } else {
      outputLinks[index] = {
        description,
        url,
        brand_id: brandId,
      };
    }

    setNextBrand((prev: any) => ({ ...prev, links: outputLinks }));
  };

  const { mutateAsync: updateBrandLinks, isPending } = useMutation({
    mutationKey: ["brand", brandId],
    mutationFn: async () => {
      const supabase = createWebClient();
      const user = await supabase.auth.getUser();
      const userId = user?.data?.user?.id;
      if (!userId) {
        throw new Error("You must be logged in to update metadata.");
      }
      const outputLinks: TablesUpdate<"links">[] = structuredClone(links).map(
        (l) => ({ ...l, user_id: userId }),
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

      if (linksToDelete.length > 0) {
        const { error } = await supabase
          .from("links")
          .delete()
          .in(
            "id",
            linksToDelete.map((l) => l.id),
          );
        if (error) {
          throw new Error(error.message);
        }
      }
      if (linksToInsert.length === 0) {
        return;
      }
      const { error } = await supabase.from("links").upsert(linksToInsert);
      if (error) {
        throw new Error(error.message);
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
  return (
    <Card className="flex aspect-[9/16] min-w-[400px] flex-col p-4 xl:shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Edit Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {initialLinkButtons.map((link, index) => (
            <div className="flex flex-col gap-1" key={index}>
              <Label>{link.description}</Label>
              <div className="relative flex w-full items-center justify-center">
                <Input
                  type="text"
                  value={
                    links.find((l) => l.description === link.description)?.url
                  }
                  onChange={(e) =>
                    setLink(link.description, e.target.value, index)
                  }
                  placeholder={`${link.description} URL`}
                />
                <span className="absolute right-4">
                  {getLinkIcon(link.description)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-auto">
        <LoadingButton
          onClick={updateBrandLinks}
          isLoading={isPending}
          className="w-full"
        >
          Save Changes
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
