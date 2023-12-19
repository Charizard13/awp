"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, StoreIcon, Trash2Icon } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { WhatAppIcon } from "../../../../../../components/icons/WhatsApp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SubmitButton from "@/components/SubmitButton";
import { Tables, TablesInsert } from "@/types";

const initialLinkButtons: Omit<TablesInsert<"links">, "brand_id">[] = [
  {
    description: "Store",
    url: "",
  },
  {
    description: "WhatApp",
    url: "",
  },
];

const getLinkIcon = (description: string) => {
  switch (description) {
    case "Store":
      return <StoreIcon className="ml-2 h-4 w-4" />;
    case "WhatApp":
      return <WhatAppIcon className="ml-2 h-4  w-4" />;
    default:
      return <StoreIcon className="ml-2 h-4 w-4" />;
  }
};

type LinksFormProps = {
  links: Tables<"links">[];
  brandId: string;
  setNextBrand: (value: React.SetStateAction<any>) => void;
};

export default function LinksForm({
  links,
  setNextBrand,
  brandId,
}: LinksFormProps) {
  const setLink = (description: string, url: string, index: number) => {
    const outputLinks: TablesInsert<"links">[] = structuredClone(links);
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
  return (
    <Card className="m-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {initialLinkButtons.map((link, index) => (
            <div className="flex gap-4" key={index}>
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
      <CardFooter>
        <SubmitButton className="ml-auto">Save Changes</SubmitButton>
      </CardFooter>
    </Card>
  );
}
