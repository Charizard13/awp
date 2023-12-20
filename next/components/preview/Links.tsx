import { TablesInsert } from "@/types";
import { Button } from "../ui/button";
import { getLinkIcon } from "@/app/dashboard/brands/[id]/edit/_components/LinksForm";

type LinksProps = {
  links: TablesInsert<"links">[];
};

export default function Links({ links }: LinksProps) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      {links.map((link) => (
        <Button key={link.id} variant={"outline"} className="min-w-xs">
          <a href={link.url} target="_blank" rel="noreferrer">
            {link.description}
          </a>
          {getLinkIcon(link.description)}
        </Button>
      ))}
    </div>
  );
}
