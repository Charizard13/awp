import { LinkType } from "@/types";
import { SetBrand } from "@/app/(main)/brands/[id]/edit/_lib/types";

export const handleOnLinkChange = (
  value: string,
  link: string,
  setNextBrand: SetBrand,
  linkType: LinkType,
  brandId: string,
) => {
  setNextBrand((prevState) => {
    if (!prevState) {
      return;
    }
    const outputLinks = structuredClone(prevState.links);
    const linkIndex = outputLinks.findIndex((l) => l.description === link);
    if (linkIndex > -1) {
      if (value === "") {
        outputLinks.splice(linkIndex, 1);
      } else {
        outputLinks[linkIndex].url = value;
      }
    } else {
      outputLinks.push({
        description: link,
        url: value,
        brand_id: brandId,
        type: linkType,
        sub_type: link,
      });
    }
    return {
      ...prevState,
      links: outputLinks,
    };
  });
};
