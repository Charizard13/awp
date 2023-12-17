"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon, StoreIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { WhatAppIcon } from "../../../../../../../components/icons/WhatsApp";

type LinkButton = {
  name: string;
  Icon: React.JSX.Element;
  url: string | undefined;
};

const initialLinkButtons: LinkButton[] = [
  {
    name: "Store",
    Icon: <StoreIcon className="ml-2 h-4 w-4" />,
    url: undefined,
  },
  {
    name: "WhatApp",
    Icon: <WhatAppIcon className="ml-2 h-4  w-4" />,
    url: undefined,
  },
];

export default function LinkButton() {
  const [linksButtons, setLinksButtons] =
    useState<LinkButton[]>(initialLinkButtons);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => {
    const updatedLinksButtons = [...linksButtons];
    const index = updatedLinksButtons.findIndex(
      (linkButton) => linkButton.name === name,
    );
    updatedLinksButtons[index].url = e.target.value;
    setLinksButtons(updatedLinksButtons);
  };

  const handleRemoveButton = (index: number) => {
    //remove url from the button
    const updatedLinksButtons = [...linksButtons];
    updatedLinksButtons[index].url = undefined;
    setLinksButtons(updatedLinksButtons);
  };

  const completedLinksButtons = linksButtons.filter(
    (linkButton) => linkButton.url !== undefined,
  );
  return (
    <div className="flex flex-col gap-4">
      {linksButtons.map((linkButton, index) => (
        <div className="flex gap-4" key={index}>
          <div className="relative flex w-full items-center justify-center">
            <Input
              type="text"
              value={linkButton.url}
              onChange={(e) => handleInputChange(e, linkButton.name)}
              placeholder={`${linkButton.name} URL`}
            />
            <span className="absolute right-4">{linkButton.Icon}</span>
          </div>
          {completedLinksButtons.includes(linkButton) && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveButton(index)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      {completedLinksButtons.map(({ name, Icon }, index) => (
        <div key={index} className="flex gap-4">
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => handleRemoveButton(index)}
          >
            {name}
            <span className="ml-2">{Icon}</span>
          </Button>
        </div>
      ))}
    </div>
  );
}
